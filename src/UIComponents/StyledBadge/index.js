import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        width: "12px",
        height: "12px",
        right: "12.37%",
        top: "32.73%",
        borderRadius: "50%",
        border: "2px solid #ffffff",
        backgroundImage:
            "linear-gradient(39.81deg, #FF4500 26.89%, #FF7846 73.11%)",
    },
}));

const CustomizedBadges = ({ childern, className, ...props }) => {
    return (
        <StyledBadge {...props} className={className}>
            {childern}
        </StyledBadge>
    );
};

export default CustomizedBadges;
