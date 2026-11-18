"use client";

import { useActionState } from "react";
import { createContactData } from "@/app/_actions/contact";
import styles from "./index.module.css";

type ContactState = Awaited<ReturnType<typeof createContactData>>;

const initialState: ContactState = {
  status: "",
  message: "",
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState<ContactState, FormData>(
    createContactData,
    initialState
  );

  if (state.status === "success") {
    return (
      <p className={styles.success} role="status">
        お問い合わせいただき、ありがとうございます。
        <br />
        お返事まで今しばらくお待ちください。
      </p>
    );
  }

  return (
    <form className={styles.form} action={formAction} noValidate>
      <div className={styles.horizontal}>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="lastname">
            姓
          </label>
          <input
            className={styles.textfield}
            type="text"
            id="lastname"
            name="lastname"
          />
        </div>

        <div className={styles.item}>
          <label className={styles.label} htmlFor="firstname">
            名
          </label>
          <input
            className={styles.textfield}
            type="text"
            id="firstname"
            name="firstname"
          />
        </div>
      </div>

      <div className={styles.item}>
        <label className={styles.label} htmlFor="company">
          会社名
        </label>
        <input
          className={styles.textfield}
          type="text"
          id="company"
          name="company"
        />
      </div>

      <div className={styles.item}>
        <label className={styles.label} htmlFor="email">
          メールアドレス
        </label>
        <input
          className={styles.textfield}
          type="email"
          id="email"
          name="email"
        />
      </div>

      <div className={styles.item}>
        <label className={styles.label} htmlFor="message">
          メッセージ
        </label>
        <textarea
          className={styles.textarea}
          id="message"
          name="message"
        />
      </div>

      <div className={styles.actions}>
        {state.status === "error" && <p role="alert">{state.message}</p>}

        <button className={styles.button} type="submit" disabled={isPending}>
          {isPending ? "送信中…" : "送信する"}
        </button>
      </div>
    </form>
  );
}