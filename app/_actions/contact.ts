"use server";

type ContactState = {
  status: string;
  message: string;
};

function readText(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function createContactData(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const lastname = readText(formData, "lastname");
  const firstname = readText(formData, "firstname");
  const company = readText(formData, "company");
  const email = readText(formData, "email");
  const message = readText(formData, "message");

  if (!lastname) {
    return { status: "error", message: "姓を入力してください" };
  }
  if (!firstname) {
    return { status: "error", message: "名を入力してください" };
  }
  if (!company) {
    return { status: "error", message: "会社名を入力してください" };
  }
  if (!email) {
    return { status: "error", message: "メールアドレスを入力してください" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "メールアドレスの形式が誤っています" };
  }
  if (!message) {
    return { status: "error", message: "メッセージを入力してください" };
  }

  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_FORM_ID;

  if (!portalId || !formId) {
    return { status: "error", message: "HubSpotの設定が見つかりません" };
  }

  const url =
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: [
          { objectTypeId: "0-1", name: "lastname", value: lastname },
          { objectTypeId: "0-1", name: "firstname", value: firstname },
          { objectTypeId: "0-1", name: "company", value: company },
          { objectTypeId: "0-1", name: "email", value: email },
          { objectTypeId: "0-1", name: "message", value: message },
        ],
      }),
    });

    if (!response.ok) {
      console.error("HubSpot送信エラー:", response.status);
      return { status: "error", message: "お問い合わせの送信に失敗しました" };
    }

    return { status: "success", message: "OK" };
  } catch {
    return { status: "error", message: "お問い合わせの送信に失敗しました" };
  }
}