import classnames from "classnames";
import { Button, Input } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiInput: {
            styleOverrides: {
                root: {
                    backgroundColor: "#f5f6fa",
                    border: "1px solid #dadff1",
                    borderTopLeftRadius: "3px",
                    borderBottomLeftRadius: "3px",
                    "&.Mui-focused": {
                        borderColor: "#909fd5",
                    },
                    transition:
                        "border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
                input: {
                    color: "#3b4468",
                    padding: "3.5px 10px",
                    "&::placeholder": {
                        opacity: 0.85,
                        color: "#596284",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    minWidth: 0,
                    borderLeft: 0,
                    borderRadius: 0,
                    color: "#3b4468",
                    padding: "8px 15px",
                    backgroundColor: "#fff",
                    border: "1px solid #dadff1",
                    borderTopRightRadius: "3px",
                    borderBottomRightRadius: "3px",
                },
            },
        },
    },
});

function Search({
    id,
    label,
    className,
    button = true,
    placeholder = "Search",
    handleSearch = () => {},
    ...props
}) {
    const handleKeyDown = (event) => {
        if (event.key === "Enter") handleSearch();
    };

    return (
        <ThemeProvider theme={theme}>
            <div
                id={id}
                className={classnames("des_searchBox", "flex", className)}
            >
                <Input
                    fullWidth
                    {...props}
                    type="search"
                    disableUnderline
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                />
                {button && (
                    <Button
                        disableElevation
                        variant="outline"
                        onClick={handleSearch}
                        aria-label="Search icon"
                        className="des_searchButton"
                        disabled={props?.disabled}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                )}
            </div>
        </ThemeProvider>
    );
}

export default Search;
