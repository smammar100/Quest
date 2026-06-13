import PostQuestForm from '@/components/post-quest/PostQuestForm';

export default function PostQuestPage() {
  return (
    <>
      <section>
        <h1>Post a quest</h1>
        <p>Tell us what you need. A trusted human will take it from there.</p>
      </section>

      <section>
        <PostQuestForm />
      </section>
    </>
  );
}
