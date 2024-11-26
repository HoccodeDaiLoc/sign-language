import { Button } from "antd";
function ButtonStyled({ children, cusWidth, type, loading }) {
    return (
        <Button
            style={{
                color: "#FFFFFF",
                width: cusWidth ? cusWidth : "fit-content",
                padding: "20px 30px",
                backgroundImage: "linear-gradient(to right, #3A8EF6, #6F3AFA)",
            }}
            htmlType={type ? type : "button"}
            size="large"
            loading={loading}
        >
            {children}
        </Button>
    );
}

export default ButtonStyled;