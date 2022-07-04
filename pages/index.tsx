import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const NAMES = ["Booster", "Cleanser", "Color Second Skin", "Micellar"];
const TOTAL = 5;

const DATA = NAMES.flatMap((name) =>
  Array.from({ length: TOTAL }).map((_, i) => ({
    name: `${name} = ${i + 1}`,
    label: name,
  }))
);

export const getServerSideProps: GetServerSideProps<{
  results: typeof DATA;
  filters: { name: string; active: boolean }[];
}> = async ({ query }) => {
  return {
    props: {
      results: query.search
        ? DATA.filter((d) => d.label === query.search)
        : DATA,
      filters: NAMES.map((name) => ({ name, active: query.search === name })),
    },
  };
};

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ results, filters }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Filter Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ul className={styles.header}>
            {filters.map(({ name, active }) => (
              <li key={name} data-active={active}>
                <Link
                  href={{
                    query: { search: name },
                  }}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>

        <h1>Results:</h1>

        <ul>
          {results.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
