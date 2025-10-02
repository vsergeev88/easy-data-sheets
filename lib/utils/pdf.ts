import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export interface PDFOptions {
  filename?: string;
  format?: "a4" | "letter";
  orientation?: "portrait" | "landscape";
  margin?: number;
  scale?: number;
}

/**
 * Генерирует и скачивает PDF из HTML элемента
 * @param element - HTML элемент для конвертации в PDF
 * @param options - Опции для настройки PDF
 */
export const generatePDFFromElement = async (
  element: HTMLElement,
  options: PDFOptions = {}
): Promise<void> => {
  const {
    filename = "response-details.pdf",
    format = "a4",
    orientation = "portrait",
    margin = 10,
    scale = 2,
  } = options;

  try {
    // Создаем canvas из HTML элемента
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      background: "#ffffff",
      logging: false,
      width: element.scrollWidth * scale,
      height: element.scrollHeight * scale,
    });

    // Получаем размеры изображения
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Создаем PDF документ
    const pdf = new jsPDF({
      orientation,
      unit: "mm",
      format,
    });

    // Получаем размеры страницы PDF
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Вычисляем размеры с учетом отступов
    const maxWidth = pageWidth - margin * 2;
    const maxHeight = pageHeight - margin * 2;

    // Масштабируем изображение под размер страницы (0.264583 - коэффициент конвертации пикселей в мм)
    const pixelToMmRatio = 0.264_583;
    const ratio = Math.min(
      maxWidth / (imgWidth * pixelToMmRatio),
      maxHeight / (imgHeight * pixelToMmRatio)
    );
    const scaledWidth = imgWidth * pixelToMmRatio * ratio;
    const scaledHeight = imgHeight * pixelToMmRatio * ratio;

    // Центрируем изображение на странице
    const x = (pageWidth - scaledWidth) / 2;
    const y = margin;

    // Если изображение слишком высокое, масштабируем его под страницу
    if (scaledHeight > maxHeight) {
      const newRatio = maxHeight / scaledHeight;
      const finalWidth = scaledWidth * newRatio;
      const finalHeight = maxHeight;
      const finalX = (pageWidth - finalWidth) / 2;

      pdf.addImage(imgData, "PNG", finalX, y, finalWidth, finalHeight);
    } else {
      // Добавляем изображение на страницу
      pdf.addImage(imgData, "PNG", x, y, scaledWidth, scaledHeight);
    }

    // Сохраняем PDF
    pdf.save(filename);
  } catch {
    throw new Error("Не удалось создать PDF файл");
  }
};

/**
 * Добавляет заголовок и метаданные в PDF
 */
const addPDFHeader = (
  pdf: jsPDF,
  responseData: { id: string; createdAt: string },
  margin: number,
  lineHeight: number
): number => {
  let yPosition = 20;

  // Заголовок
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("Response Details", margin, yPosition);
  yPosition += lineHeight * 2;

  // Дата создания
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  const createdText = `Created: ${new Date(responseData.createdAt).toLocaleString("en-US")}`;
  addTextSafely(pdf, createdText, margin, yPosition);
  yPosition += lineHeight * 2;

  // ID ответа
  const idText = `Response ID: ${responseData.id}`;
  addTextSafely(pdf, idText, margin, yPosition);
  yPosition += lineHeight * 2;

  return yPosition;
};

// Регулярное выражение для проверки кириллических символов
const CYRILLIC_REGEX = /[а-яёА-ЯЁ]/;

/**
 * Проверяет, содержит ли текст кириллические символы
 */
const hasCyrillic = (text: string): boolean => {
  return CYRILLIC_REGEX.test(text);
};

/**
 * Безопасно добавляет текст в PDF с поддержкой кириллицы
 */
const addTextSafely = (
  pdf: jsPDF,
  text: string,
  x: number,
  y: number
): void => {
  // Если текст содержит кириллицу, сразу используем транслитерацию
  if (hasCyrillic(text)) {
    const transliteratedText = transliterate(text);
    pdf.text(transliteratedText, x, y);
    return;
  }

  // Для текста без кириллицы используем обычный способ
  try {
    pdf.text(text, x, y);
  } catch {
    // Fallback на транслитерацию если что-то пошло не так
    const transliteratedText = transliterate(text);
    pdf.text(transliteratedText, x, y);
  }
};

/**
 * Добавляет заголовок fieldset в PDF
 */
const addFieldsetHeader = (
  pdf: jsPDF,
  legend: string,
  margin: number,
  currentY: number,
  lineHeight: number
): number => {
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  const legendText = legend || "Fieldset";
  addTextSafely(pdf, legendText, margin, currentY);
  return currentY + lineHeight * 1.5;
};

/**
 * Добавляет поле в PDF
 */
const addFieldToPDF = (
  pdf: jsPDF,
  field: { name: string; value: string | string[] },
  margin: number,
  currentY: number,
  lineHeight: number,
  pageWidth: number
): number => {
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");

  // Название поля
  const fieldName = `${field.name || "Field"}:`;
  addTextSafely(pdf, fieldName, margin, currentY);

  // Значение поля
  pdf.setFont("helvetica", "normal");
  let value: string;

  if (Array.isArray(field.value)) {
    value = field.value.join("; ");
  } else if (typeof field.value === "string") {
    value = field.value;
  } else {
    value = String(field.value || "N/A");
  }

  // Разбиваем длинный текст на строки
  const maxWidth = pageWidth - margin * 2 - 40;
  let lines: string[];
  let finalValue = value;

  // Если значение содержит кириллицу, транслитерируем его
  if (hasCyrillic(value)) {
    finalValue = transliterate(value);
  }

  try {
    lines = pdf.splitTextToSize(finalValue, maxWidth);
    pdf.text(lines, margin + 40, currentY);
  } catch {
    // Дополнительный fallback на случай других проблем
    const safeValue = finalValue.replace(/[^\u0020-\u007E]/g, "?"); // Заменяем не-ASCII символы на ?
    lines = pdf.splitTextToSize(safeValue, maxWidth);
    pdf.text(lines, margin + 40, currentY);
  }

  return currentY + lineHeight * Math.max(1, lines.length);
};

/**
 * Добавляет fieldset в PDF
 */
const addFieldsetToPDF = (
  pdf: jsPDF,
  fieldset: {
    legend: string;
    fields: { name: string; value: string | string[] }[];
  },
  yPosition: number,
  margin: number,
  lineHeight: number,
  pageWidth: number
): number => {
  let currentY = yPosition;

  // Проверяем, нужна ли новая страница
  if (currentY > pdf.internal.pageSize.getHeight() - 40) {
    pdf.addPage();
    currentY = 20;
  }

  // Добавляем заголовок fieldset
  currentY = addFieldsetHeader(
    pdf,
    fieldset.legend,
    margin,
    currentY,
    lineHeight
  );

  // Поля fieldset
  for (const field of fieldset.fields) {
    // Проверяем, нужна ли новая страница
    if (currentY > pdf.internal.pageSize.getHeight() - 30) {
      pdf.addPage();
      currentY = 20;
    }

    currentY = addFieldToPDF(
      pdf,
      field,
      margin,
      currentY,
      lineHeight,
      pageWidth
    );
  }

  return currentY + lineHeight;
};

/**
 * Простая функция транслитерации кириллицы в латиницу
 */
const transliterate = (text: string): string => {
  const cyrillicToLatin: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "Yo",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "Kh",
    Ц: "Ts",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Shch",
    Ъ: "",
    Ы: "Y",
    Ь: "",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
  };

  const result = text.replace(
    /[а-яёА-ЯЁ]/g,
    (char) => cyrillicToLatin[char] || char
  );

  // Отладочная информация
  if (text !== result) {
    // eslint-disable-next-line no-console
    console.log(`Transliteration: "${text}" -> "${result}"`);
  }

  return result;
};

/**
 * Генерирует PDF с кастомным содержимым для ответов формы
 * @param responseData - Данные ответа
 * @param options - Опции для PDF
 */
export const generateResponsePDF = (
  responseData: {
    id: string;
    createdAt: string;
    data: string;
  },
  options: PDFOptions = {}
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const {
      filename = `response-${responseData.id}.pdf`,
      format = "a4",
      orientation = "portrait",
    } = options;

    try {
      const pdf = new jsPDF({
        orientation,
        unit: "mm",
        format,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const lineHeight = 7;

      // Добавляем заголовок
      let yPosition = addPDFHeader(pdf, responseData, margin, lineHeight);

      // Парсим данные ответа
      let parsedData: Array<{
        legend: string;
        fields: { name: string; value: string | string[] }[];
      }>;

      try {
        parsedData = JSON.parse(responseData.data || "[]");
      } catch {
        // Если не удается распарсить данные, создаем структуру по умолчанию
        parsedData = [
          {
            legend: "Data parsing error",
            fields: [
              {
                name: "Raw data",
                value: responseData.data || "No data available",
              },
            ],
          },
        ];
      }

      // Добавляем отладочную информацию в PDF
      if (parsedData.length === 0) {
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "normal");
        pdf.text("No fieldsets found in response data", margin, yPosition);
        yPosition += lineHeight * 2;
      }

      // Обрабатываем каждый fieldset
      for (const fieldset of parsedData) {
        yPosition = addFieldsetToPDF(
          pdf,
          fieldset,
          yPosition,
          margin,
          lineHeight,
          pageWidth
        );
      }

      // Сохраняем PDF
      pdf.save(filename);
      resolve();
    } catch {
      reject(new Error("Не удалось создать PDF файл"));
    }
  });
};
