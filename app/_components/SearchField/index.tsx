"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { FormEvent } from "react";
import styles from "./index.module.css";

function SearchFieldComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q") ?? "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const input = event.currentTarget.elements.namedItem("q");

    if (input instanceof HTMLInputElement) {
      const params = new URLSearchParams();
      params.set("q", input.value.trim());

      router.push(`/news/search?${params.toString()}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.search}>
        <Image
          src="/search.svg"
          alt="検索"
          width={16}
          height={16}
          loading="eager"
        />
        <input
          key={keyword}
          type="text"
          name="q"
          defaultValue={keyword}
          placeholder="キーワードを入力"
          className={styles.searchInput}
        />
      </label>
    </form>
  );
}

export default function SearchField() {
  return (
    <Suspense fallback={null}>
      <SearchFieldComponent />
    </Suspense>
  );
}