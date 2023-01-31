import React from "react";
import { Document, Page, View, StyleSheet } from "@react-pdf/renderer";

// * ui elements *
import HtmlToReactPDF from "react-pdf-html";

// * styles *
const styles = StyleSheet.create({
    page: {
        margin: 0,
        padding: 0,
        fontSize: 14,
    },
    view: {
        padding: 10,
    },
});

const PDFDocument = React.memo(({ pdfOptions = {}, html = "" }) => {
    const documentOptions = {
        title: pdfOptions?.title ?? "PDF title",
        author: pdfOptions?.author ?? "PDF Author",
        subject: pdfOptions?.subject ?? "PDF Subject",
    };

    const pageOptions = {
        size: pdfOptions?.size ?? "A4",
        wrap: pdfOptions?.wrap ?? true,
        orientation: pdfOptions?.orientation ?? "portrait",
    };

    return (
        <Document {...documentOptions}>
            <Page style={styles.page} {...pageOptions}>
                <View style={styles.view}>
                    <HtmlToReactPDF>{html}</HtmlToReactPDF>
                </View>
            </Page>
        </Document>
    );
});

export default PDFDocument;
