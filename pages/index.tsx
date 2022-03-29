import type { NextPage } from "next";
import Head from "next/head";
import { MouseEventHandler } from "react";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import styles from "../styles/Home.module.css";

const hex = "0123456789ABCDEF".split("");
const Home: NextPage = () => {
  const [_value, copy] = useCopyToClipboard();
  const clickHandler: MouseEventHandler<HTMLButtonElement>  = (e) => {
    copy(e.currentTarget.title)
    e.currentTarget.blur()
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>3-Digit Hex Colors</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>3-Digit Hex Colors</h1>
        <p className={styles.description}>Click on the color to copy</p>
        <div className={styles.tiles}>
          {hex.map((i) =>
            hex.map((j) =>
              hex.map((k) => {
                const color = `#${i}${j}${k}`;
                return (
                  <button
                    key={color}
                    onClick={clickHandler}
                    className={styles.tile}
                    style={{background: color}}
                    title={color}
                  />
                );
              })
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
