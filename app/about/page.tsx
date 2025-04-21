import { redirect } from 'next/navigation';
import { getComments, createComment, Comment } from '@/lib/data'; // Use alias @/lib

export default async function About() {
  async function create(formData: FormData) {
    'use server';
    const commentText = formData.get('comment') as string; // Get comment text
    try {
      await createComment(commentText);
      redirect('/about'); // Redirect to refresh the page and show new comment
    } catch (error) {
      console.error('Failed to create comment:', error);
      // Handle error appropriately, e.g., show a message to the user
    }
  }

  // Fetch comments using the imported function
  const comments: Comment[] = await getComments();

  console.log(comments);

  return (
    <div>
      <form action={create}>
        <input type="text" placeholder="write a comment" name="comment" />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {/* Ensure comments array is not empty before mapping */}
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <li key={index}>{comment.comment}</li> // Use comment.id for the key
          ))
        ) : (
          <li>No comments yet.</li>
        )}
      </ul>
    </div>
  );
}