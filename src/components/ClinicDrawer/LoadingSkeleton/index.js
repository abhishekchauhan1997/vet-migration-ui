import { ListItemAvatar, ListItemText, Skeleton } from "@mui/material";
import List from "UIComponents/List";

const LoadingSkeleton = ({ logo }) => {
    return [...Array(5)].map((x, i) => (
        <List.Item key={i}>
            {logo && (
                <ListItemAvatar>
                    <Skeleton
                        animation="wave"
                        variant="circular"
                        width={38}
                        height={38}
                    />
                </ListItemAvatar>
            )}
            <ListItemText>
                <Skeleton
                    sx={{ height: 46 }}
                    animation="wave"
                    variant="rectangular"
                />
            </ListItemText>
        </List.Item>
    ));
};

export default LoadingSkeleton;
