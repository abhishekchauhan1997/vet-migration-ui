import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

// * ui elements *
import { PDFViewer } from "@react-pdf/renderer";
// * utils *
import { makeURL } from "utils/appUtils";
import PDFDocument from "components/PDFDownloader/PDFDocument";
import { useParams } from "react-router-dom";
import invoicedata from "./data.json";
import PdfDocument from "pages/headerNavigation/Amount/PastInvoice/GenerateInvoice/Invoice";

const PDFTabView = () => {
    const type = "json";
    // local state
    const [html, setHtml] = useState("");
    let { action } = useParams();

    const dummyHtml = `<html>
  <body>
    <style>
      .my-heading4 {
        background: darkgreen;
        color: white;
      }
      pre {
        background-color: #eee;
        padding: 10px;
      }
    </style>
    <h1>Heading 1</h1>
    <h2 style="background-color: pink">Heading 2</h2>
    <h3>Heading 3</h3>
    <h4 class="my-heading4">Heading 4</h4>
    <p>
      Paragraph with <strong>bold</strong>, <i>italic</i>, <u>underline</u>,
      <s>strikethrough</s>,
      <strong><u><s><i>and all of the above</i></s></u></strong>
    </p>
    <p>
      
    </p>
    <hr />
    <ul>
      <li>Unordered item</li>
      <li>Unordered item</li>
    </ul>
    <ol>
      <li>Ordered item</li>
      <li>Ordered item</li>
    </ol>
    <br /><br /><br /><br /><br />
    Text outside of any tags
    <table>
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Foo</td>
          <td>Bar</td>
          <td>Foobar</td>
        </tr>
        <tr>
          <td colspan="2">Foo</td>
          <td>Bar</td>
        </tr>
        <tr>
          <td>Some longer thing</td>
          <td>Even more content than before!</td>
          <td>Even more content than before!</td>
        </tr>
      </tbody>
    </table>
    <div style="width: 200px; height: 200px; background: pink"></div>
    <pre>
function myCode() {
  const foo = 'bar';
}
</pre>
  </body>
</html>
`;
    const isNotEmptyString = useCallback((str = "") => {
        const isString = typeof str === "string";
        let string = isString ? str : "";

        return string.trim().length > 0;
    }, []);

    const fetchPDFDataFromURL = useCallback(
        (dataURL = "") => {
            const errMessage = "Failed to fetch HTML for PDF Downloader";
            const url = makeURL([dataURL]);

            return axios
                .get(url)
                .then(({ data }) => ({
                    err: false,
                    data: data,
                }))
                .catch(({ response: { data } }) => ({
                    err: true,
                    message: data?.message ?? errMessage,
                }))
                .then(({ err, message, data }) => {
                    if (err) {
                        console.error(message);
                        return;
                    }

                    const htmlString = JSON.stringify(data);
                    const fallbackString = "No HTML data provided";
                    const hasHtmlString = isNotEmptyString(htmlString);

                    return hasHtmlString ? htmlString : fallbackString;
                });
        },
        [isNotEmptyString]
    );

    const setPDFData = useCallback(() => {
        fetchPDFDataFromURL().then((res) => setHtml(res));
    }, [fetchPDFDataFromURL]);

    useEffect(() => {
        let api_enabled = false;
        if (api_enabled) {
            setPDFData();
        }
    }, [setPDFData]);

    return (
        <>
            {action === "pdf" ? (
                <PDFViewer
                    style={{
                        border: "none",
                        width: "100vw",
                        height: "100vh",
                    }}
                >
                    {type === "json" ? (
                        <PdfDocument
                            invoicedata={invoicedata ?? {}}
                            pdfOptions={{ title: "Statement" }}
                        />
                    ) : (
                        <PDFDocument
                            html={dummyHtml ?? html}
                            pdfOptions={{ title: "Statement" }}
                        />
                    )}
                </PDFViewer>
            ) : (
                <div>Print Page</div>
            )}
        </>
    );
};

export default PDFTabView;
