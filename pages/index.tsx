import type { NextPage } from "next";
import Head from "next/head";
import { MouseEventHandler, useEffect, useState } from "react";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import styles from "../styles/Home.module.css";

const hex = "0123456789ABCDEF".split("");
const mapRotationToPermutation = (r: number, i: string, j: string, k: string) =>{
  switch(r) {
    case 0: return `#${i}${j}${k}`
    case 1: return `#${i}${k}${j}`
    case 2: return `#${j}${i}${k}`
    case 3: return `#${j}${k}${i}`
    case 4: return `#${k}${j}${i}`
    case 5: return `#${k}${i}${j}`
  }
}
const Home: NextPage = () => {
  const [rotation, setRotation] = useState(0)
  const [_value, copy] = useCopyToClipboard();

  const copyHandler: MouseEventHandler<HTMLButtonElement>  = (e) => {
    copy(e.currentTarget.title)
    e.currentTarget.blur()
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if(e.key === 'Enter') {
        setRotation((rotation + 1) % 6)
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [rotation])

  return (
    <div className={styles.container}>
      <Head>
        <title>3-Digit Hex Colors</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>3-Digit Hex Colors</h1>
        <p className={styles.description}>Click on the color to copy.</p>
        <p className={styles.tip}>Press <kbd>Enter</kbd> to reorder them.</p>
        <div className={styles.tiles}>
          {hex.map((i) =>
            hex.map((j) =>
              hex.map((k) => {
                const color = mapRotationToPermutation(rotation,i,j,k);
                return (
                  <button
                    key={i+j+k}
                    onClick={copyHandler}
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
