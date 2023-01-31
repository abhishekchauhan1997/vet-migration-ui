import React, {
    startTransition,
    useCallback,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

const TOOLBAR_OPTIONS = [
    "undo redo",
    "bold italic forecolor removeformat",
    "alignleft aligncenter alignright",
];

const EDITOR_HEIGHT = 250;

const WYSIWYGEditor = React.forwardRef(
    (
        {
            id,
            options = {
                height: EDITOR_HEIGHT,
                toolbar: TOOLBAR_OPTIONS,
            },
            onBlur = () => {},
            onInit = () => {},
            onChange = () => {},
            defaultValue = "",
            keywords = [],
            error,
            helperText,
            ...props
        },
        ref
    ) => {
        // refs
        const editor = useRef(null);

        // local state
        const [htmlState, setHtmlState] = useState(defaultValue);
        const [isLoading, setIsLoading] = useState(true);

        const insertContent = useCallback((content = "") => {
            const activeEditor = editor.current?.editor;

            activeEditor.execCommand("mceInsertContent", false, content);
            activeEditor?.iframeElement.blur();
        }, []);

        useImperativeHandle(ref, () => ({ insertContent }), [insertContent]);

        const moveCursorToEnd = () => {
            const activeEditor = editor.current?.editor;

            if (activeEditor) {
                activeEditor.selection.select(activeEditor.getBody(), true);
                activeEditor.selection.collapse(false);
            }
        };

        const replaceKeywords = (html = "", keywords) => {
            let replacedHtml = html;

            keywords.forEach(({ keyword, text }) => {
                const keywordRegex = new RegExp(
                    `${keyword.replace(/\$/g, "\\$")}`
                );
                replacedHtml = replacedHtml.replace(keywordRegex, text);
            });

            return replacedHtml;
        };

        const onHtmlValueChange = (html) => {
            let newHtml = replaceKeywords(html, keywords);

            // only replace if keyword matches have actually changed the html
            if (html !== newHtml) startTransition(moveCursorToEnd);

            onChange(newHtml);
            setHtmlState(newHtml);
        };

        return (
            <ErrorWrapper
                ref={ref}
                id={id}
                error={error}
                helperText={helperText}
                sx={{ height: options?.height ?? EDITOR_HEIGHT }}
            >
                {isLoading && <Loader />}

                <Editor
                    ref={(editorRef) => (editor.current = editorRef)}
                    init={{
                        plugins:
                            "table link image fullscreen code forecolor media",
                        toolbar: options?.toolbar
                            ? options?.toolbar.join(" | ")
                            : TOOLBAR_OPTIONS.join(" | "),
                        height: options?.height ?? EDITOR_HEIGHT,
                        menubar: false,
                    }}
                    value={htmlState}
                    onEditorChange={onHtmlValueChange}
                    onInit={(...args) => {
                        setIsLoading(false);
                        onInit(...args);
                    }}
                    onBlur={onBlur}
                    {...props}
                />
            </ErrorWrapper>
        );
    }
);

export default WYSIWYGEditor;

const Loader = ({ loadingText = "Loading Editor" }) => {
    return (
        <Box
            sx={{
                position: "absolute",
                height: "100%",
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "rgba(255, 255, 255, 0.7)",
                zIndex: 99,
            }}
        >
            <Stack direction="column" alignItems="center" spacing={1}>
                <Typography variant="caption">{loadingText}</Typography>
                <CircularProgress size={25} />
            </Stack>
        </Box>
    );
};

const ErrorWrapper = ({ id, error, helperText, children, sx }) => {
    return (
        <Box
            id={id}
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                ...sx,
            }}
        >
            <Box
                sx={{
                    border: `${error ? "1px" : "0"} solid #d32f2f`,
                    borderRadius: 10,
                }}
            >
                {children}
            </Box>
            {error && (
                <p
                    style={{
                        color: "#d32f2f",
                        fontSize: "0.75rem",
                        fontWeight: 400,
                        lineHeight: 1.66,
                        marginTop: 5,
                        marginLeft: 14,
                    }}
                >
                    {helperText}
                </p>
            )}
        </Box>
    );
};
