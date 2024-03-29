/* eslint-disable @next/next/no-img-element */
import { SignInButton, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import Image from "next/image";
import LoadingSpinner, {
  LoadingPage,
} from "~/components/LoadingSpinner/LoadingSpinner";
import { useState } from "react";
import toast from "react-hot-toast";
import { PageLayout } from "~/components/Layout/Layout";
import PostView from "~/components/PostView/PostView";

const CreatePostWizard = () => {
  const [inputText, setInputText] = useState<string>("");
  const { user } = useUser();

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInputText("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post");
      }
    },
  });

  if (!user) return null;
  return (
    <div className="flex w-full gap-3">
      <Image
        className="h-14 w-14 rounded-full"
        src={user.profileImageUrl}
        alt="Profile picture"
        width={56}
        height={56}
      />
      <input
        placeholder="Type something"
        className="grow bg-transparent outline-none"
        value={inputText}
        disabled={isPosting}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (inputText !== "") {
              mutate({ content: inputText });
            }
          }
        }}
        onChange={(e) => setInputText(e.target.value)}
      />
      {inputText !== "" && !isPosting && (
        <button onClick={() => mutate({ content: inputText })}>Post</button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong</div>;
  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

export default function Home() {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  api.posts.getAll.useQuery();

  if (!userLoaded) return <div />;

  return (
    <>
      <PageLayout>
        <div className="flex border-b border-slate-700 p-4">
          {!isSignedIn && (
            <div className="flex justify-center">
              <SignInButton />
            </div>
          )}
          {isSignedIn && <CreatePostWizard />}
        </div>
        <Feed />
      </PageLayout>
    </>
  );
}
