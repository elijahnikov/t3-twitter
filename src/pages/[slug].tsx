/* eslint-disable @next/next/no-img-element */
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import superjson from "superjson";
import { PageLayout } from "~/components/Layout/Layout";
import Image from "next/image";
import { LoadingPage } from "~/components/LoadingSpinner/LoadingSpinner";
import PostView from "~/components/PostView/PostView";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProfileFeed = ({ userId }: { userId: string }) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({ userId });

  if (isLoading) return <LoadingPage />;

  if (!data || data.length === 0) return <div>User has not posted.</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const ProfilePage: NextPage<PageProps> = ({ username }) => {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username,
  });
  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>404</div>;
  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <PageLayout>
        <div className="relative h-36 bg-slate-600">
          <Image
            width={128}
            height={128}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black"
            src={data.profilePicture}
            alt="Profile picture"
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="p-4 text-2xl font-bold">@{data.username ?? ""}</div>
        <div className="w-full border-b border-slate-700"></div>
        <ProfileFeed userId={data.id} />
      </PageLayout>
    </>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const helpers = generateSSGHelper();
  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("No slug");

  await helpers.profile.getUserByUsername.prefetch({
    username: slug.replace("@", ""),
  });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      username: slug.replace("@", ""),
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
