import PuffLoader from "react-spinners/PuffLoader";
import Head from "next/head";

export default function Loading({ data, color, theme }) {
  return (
    <>
      <Head>
        {!data ? <style>{"body { overflow: hidden; }"}</style> : null}
      </Head>
      {!data ? (
        <div className={`loading ${theme}`}>
          <PuffLoader size={150} color={color} />
        </div>
      ) : null}
    </>
  );
}
