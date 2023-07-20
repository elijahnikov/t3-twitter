import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/Layout/Layout";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import PostView from "~/components/PostView/PostView";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePostPage: NextPage<PageProps> = ({ id }) => {
  const { data, isLoading } = api.posts.getById.useQuery({ id });
  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>404</div>;
  return (
    <>
      <Head>
        <title>{`${data.post.content} - @${data.author.username}`}</title>
      </Head>
      <PageLayout>
        <PostView {...data} />
      </PageLayout>
    </>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const helpers = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("No slug");

  await helpers.posts.getById.prefetch({ id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;
