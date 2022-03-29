import type { NextPage } from "next";
import Head from "next/head";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import styles from "../styles/Home.module.css";

const hex = "0123456789ABCDEF".split("");
const Home: NextPage = () => {
  const [_value, copy] = useCopyToClipboard();
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
                const color = "#" + i + j + k;
                return (
                  <button
                    key={color}
                    onClick={() => copy(color)}
                    className={styles.tile}
                    style={{backgroundColor: color}}
                  >
                    <span
                      style={{ color: "#FFF", textShadow: "1px 1px 0 #000" }}
                    >
                      {color}
                    </span>
                  </button>
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
