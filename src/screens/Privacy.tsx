import { useLang } from "@/lib/i18n";
import { useByeol } from "@/lib/store";
import { Toggle } from "@/components/ui";

export function PrivacyScreen() {
  const { t } = useLang();
  const { employerMatching, setEmployerMatching, pushToast } = useByeol();

  return (
    <div className="stack">
      <h1 className="screen-title">{t("privacy_title")}</h1>
      <div className="banner">
        <div className="dot" />
        <p>{t("pv_banner")}</p>
      </div>

      <div className="privacy-flow">
        <div className="privacy-tile private">
          <span className="privacy-icon">🔒</span>
          <p className="privacy-kicker">{t("pv_k1")}</p>
          <p className="privacy-verdict">{t("pv_v1")}</p>
          <p className="privacy-note">{t("pv_n1")}</p>
        </div>
        <div className="privacy-tile aggregate">
          <span className="privacy-icon">📊</span>
          <p className="privacy-kicker">{t("pv_k2")}</p>
          <p className="privacy-verdict">{t("pv_v2")}</p>
          <p className="privacy-note">{t("pv_n2")}</p>
        </div>
        <div className="privacy-tile consent">
          <span className="privacy-icon">✋</span>
          <p className="privacy-kicker">{t("pv_k3")}</p>
          <p className="privacy-verdict">{t("pv_v3")}</p>
          <p className="privacy-note">{t("pv_n3")}</p>
        </div>
      </div>

      <p className="section-title">{t("pv_uses")}</p>
      <div className="card">
        {["pv_u1", "pv_u2", "pv_u3", "pv_u4", "pv_u5", "pv_u6", "pv_u7"].map((x) => (
          <div className="profile-field" key={x}>
            <span>{t(x)}</span>
            <b>{t("pv_used_for")}</b>
          </div>
        ))}
      </div>

      <p className="section-title">{t("pv_univ_title")}</p>
      <div className="card">
        <p className="feed-sub">{t("pv_univ_body")}</p>
      </div>

      <p className="section-title">{t("pv_emp_title")}</p>
      <div className="card">
        <p className="feed-sub">{t("pv_emp_body")}</p>
        <div className="profile-field">
          <span>{t("pv_emp_toggle")}</span>
          <Toggle
            on={employerMatching}
            onChange={(v) => {
              setEmployerMatching(v);
              pushToast({
                title: v ? "toast_emp_on" : "toast_emp_off",
                body: v ? "toast_emp_on_body" : "toast_emp_off_body",
              });
            }}
          />
        </div>
        <p className="evidence-note">{t("pv_default_off")}</p>
      </div>

      <p className="section-title">{t("pv_controls")}</p>
      <div className="card">
        {["pv_c1", "pv_c2", "pv_c3", "pv_c4"].map((c) => (
          <button
            key={c}
            className="settings-row control-row"
            onClick={() => pushToast({ title: "pv_prototype_control", params: { x: t(c) } })}
          >
            {t(c)}
            <span className="chevron">›</span>
          </button>
        ))}
      </div>

      <p className="section-title">{t("pv_sources")}</p>
      <div className="card">
        <p className="feed-sub">
          <b>{t("pv_today_label")}</b> {t("pv_today_body")}
        </p>
        <p className="feed-sub" style={{ marginTop: 8 }}>
          <b>{t("pv_future_label")}</b> {t("pv_future_body")}
        </p>
      </div>
    </div>
  );
}
