import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function LinkResult({ inputValue }) {
  const [shortenLink, setShortenLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function sortUrl() {
    setLoading(true);
    const response = await fetch("http://localhost:3000/url/shorten", {
      method: "POST",
      body: JSON.stringify({ longUrl: inputValue }),
      headers: { "Content-Type": "application/json" },
    });
    if (response && response.ok) {
  response.json().then((data) => {
    setShortenLink(data.data.shortUrl); // access the longUrl value from the data object
    //console.log(data.data.longUrl);
    setLoading(false);
  });
}else {
      setShortenLink("Not a valid URL");
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    if (inputValue.length) {
      sortUrl();
    }
  }, [inputValue]);

  return (
    <>
      {shortenLink !== "" && (
        <div className="result">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p className="shorten-link">{shortenLink}</p>
              {shortenLink !== "Not a valid URL" && (
                <CopyToClipboard
                  text={shortenLink}
                  onCopy={() => setCopied(true)}
                >
                  <button className={copied ? "copied" : ""}>
                    Copy to Clipboard
                  </button>
                </CopyToClipboard>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
