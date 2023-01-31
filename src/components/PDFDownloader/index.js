import React, { useCallback, useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";

// * ui elements *
import Button from "UIComponents/Button";
import PDFDocument from "./PDFDocument";
import PDFModal from "./PDFModal";

// * hooks *
import useGetPageDataContext from "hooks/usePageDataContext";

// * utils *
import { makeURL, downloadFile } from "utils/appUtils";

/**
 * Component for getting PDF data and downloading the PDF on click
 * 
 * @property {boolean} mode: Either `modal` or `download-link`
 * @property {string} buttonLabel: Label for the button
 * @property {string} modalTitle: Title for PDF modal
 * @property {boolean} showToolbar: For showing native browser toolbar
 * @property {string} loadFromURL: Used for loading html data on mount
 * @property {string} htmlData: Used directly for downloading PDF
 * @property {string} className: Class for component
 * @property {boolean} loading: For showing loading state
 * @property {function} getHtmlFromResponse: For mapping html string data from response correctly
 * @property {object} pdfOptions: For modifying how the pdf looks
 *
 * @component
 * @example
 * 
 * const markup = '<p>New paragraph</p>'
 * 
 * return (
    <PDFDownloader
        mode={'modal'} // defaults to 'download-link'
        buttonLabel="Download Reminder PDF"
        modalTitle="View Reminder PDF"
        showToolbar={false} // defaults to `true`
        loadFromURL="reminder/custom/fetch" // required if `htmlData` not provided
        getHtmlFromResponse={(data) => data?.[0]?.staffId} // for mapping the data from the response
        htmlData={markup} // required if `loadFromURL` not provided
        outputFileName="reminder.pdf"
        loading={false}
        className={'reminder-pdf-button'}
        pdfOptions={{  
            size: 'A5', // defaults to 'A4',
            title: 'PDF title', // will be used as modal title as well
            author: 'PDF author',
            subject: 'PDF subject',
            wrap: false, // defaults to true
            orientation: 'landscape', // defaults to 'portrait'
        }}
    >
        {* will default to a button with `title` prop if no children provided *}
        <button>Download PDF</button>
    </PDFDownloader>
 * )
 */
const PDFDownloader = React.forwardRef(
    (
        {
            mode = "download-link",
            buttonLabel = "Download PDF",
            modalTitle = "View PDF",
            outputFileName = "vetport.pdf",
            showToolbar = true,
            loadFromURL = "",
            htmlData = "",
            getHtmlFromResponse,
            pdfOptions = {},
            loading = false,
            style = {},
            className = "pdf-download",
            children,
        },
        ref
    ) => {
        // local state
        const [html, setHtml] = useState("");
        const [showPDFModal, setShowPDFModal] = useState(false);
        const [isLoading, setIsLoading] = useState(false);

        // hooks
        const { setAlert } = useGetPageDataContext();

        const alert = useCallback(
            (message = "", type = "success") => {
                setAlert({
                    open: true,
                    message,
                    serverity: type,
                });
            },
            [setAlert]
        );

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
                        data: getHtmlFromResponse?.(data) ?? data,
                    }))
                    .catch(({ response: { data } }) => ({
                        err: true,
                        message: data?.message ?? errMessage,
                    }))
                    .then(({ err, message, data }) => {
                        if (err) {
                            alert(message, "error");
                            return;
                        }

                        const htmlString = JSON.stringify(data);
                        const fallbackString = "No HTML data provided";
                        const hasHtmlString = isNotEmptyString(htmlString);

                        setIsLoading(false);

                        return hasHtmlString ? htmlString : fallbackString;
                    });
            },
            [alert, getHtmlFromResponse, isNotEmptyString]
        );

        const setPDFData = useCallback(() => {
            setIsLoading(true);

            const hasHtmlData = isNotEmptyString(htmlData);

            if (hasHtmlData) {
                setHtml(htmlData);
                return setIsLoading(false);
            }

            const hasURL = isNotEmptyString(loadFromURL);
            const warnMessage =
                "PDFDownloder: One of `loadFromURL`, `htmlData` props are required";

            if (!hasURL) {
                console.warn(warnMessage);
                return setIsLoading(false);
            }

            fetchPDFDataFromURL(loadFromURL).then((res) => setHtml(res));
        }, [htmlData, loadFromURL, isNotEmptyString, fetchPDFDataFromURL]);

        useEffect(() => {
            // TODO: stop multiple requests on first mount
            setPDFData();
        }, [setPDFData]);

        const togglePDFModal = () => {
            setShowPDFModal((currOpenState) => !currOpenState);
        };

        const onButtonClick = (ev) => {
            if (mode === "modal") {
                ev.preventDefault();
                togglePDFModal();
            }
        };

        return (
            <>
                <PDFDownloadLink
                    ref={ref}
                    style={style}
                    className={className}
                    onClick={onButtonClick}
                    document={
                        <PDFDocument html={html} pdfOptions={pdfOptions} />
                    }
                    fileName={outputFileName}
                >
                    {({ blob, url, loading: pdfLoading, error }) => {
                        if (error) {
                            return <Button>Error loading PDF</Button>;
                        }

                        return pdfLoading || loading || isLoading ? (
                            <Button>Loading PDF...</Button>
                        ) : (
                            children ?? <Button>{buttonLabel}</Button>
                        );
                    }}
                </PDFDownloadLink>

                {/* PDF MODAL */}
                <PDFModal
                    title={modalTitle}
                    open={showPDFModal}
                    closeModal={togglePDFModal}
                    options={{ showToolbar }}
                    document={
                        <PDFDocument html={htmlData} pdfOptions={pdfOptions} />
                    }
                />
            </>
        );
    }
);

export default PDFDownloader;

export const downloadPDF = async (component, filename) => {
    const staticHTML = renderToStaticMarkup(component);
    console.log(staticHTML);

    const pdfBlob = await pdf(<PDFDocument html={staticHTML} />).toBlob();
    const blobURL = URL.createObjectURL(pdfBlob);

    downloadFile(blobURL, filename);

    URL.revokeObjectURL(blobURL);
};
