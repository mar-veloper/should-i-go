import MoonLoader from "react-spinners/MoonLoader";
import Head from 'next/head';

export default function Loading ({ data, color, theme }) { 

  return (
    <>
      <Head>
        {!data ?
          <style>
            {'body { overflow: hidden; }'}
          </style>
        : null
        }
      </Head>
      {!data ?
        <div className={`loading ${theme}`}>
          <MoonLoader size={150} color={color} />
        </div>
      : null}
    </>
  )
}