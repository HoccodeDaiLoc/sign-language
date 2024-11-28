import { Upload, Button, Form, Row, Col, Flex } from "antd";
import SearchBarTransition from "../../components/common/SearchBarTransition";
import colors from "../../constants/Colors";
import { useState } from "react";
import Title from "antd/es/typography/Title";
import '../../assets/css/antd_css.css'
import { FaArrowDown } from "react-icons/fa";

const UserUploadVideo = () => {

  const [videoSrc, setVideoSrc] = useState("");

  const initialstate = {
    videoSrc: ""
  }

  const onFinish = (values) => {
    console.log(values)
  }
  const onFinishFailed = (values) => {
    console.log("fails", values)
  }
  const beforeUpload = (file) => {
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      // .error("Video phải nhỏ hơn 10MB!");
    }
    return isLt10M || Upload.LIST_IGNORE;
  }


  const handleChange = ({ file }) => {
    if (file.file.status === "done") {
      //tạo Url tạm
      const url = URL.createObjectURL(file.file.originFileObj);
      setVideoSrc(url)
    }
  }
  return (

    <Row gutter={[16, 16]} style={{
      height: "100%",
      width: "100%",
      overflow: "hidden",
    }}>

      <Col span={6} style={{
        borderRight: `0.3px solid ${colors.borderlight}`,
        padding: "1rem",

      }}>
        <Title level={6} style={{ marginBottom: "1.5rem", fontSize: "18px" }}>
          Video
        </Title>
        <Flex style={{ justifyContent: "center", alignItems: "center" }}>
          <SearchBarTransition size={"80%"}></SearchBarTransition>
        </Flex>
        <Flex style={{ marginTop: "1.5rem", justifyContent: "flex-end" }}>
          <p>
            Sort by Creation Time
          </p>
          <button>
            {/* </FaArrowDown> */}
          </button>
        </Flex>
      </Col>
      <Col span={18}>


        {/* <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"

          >
            <Form.Item
              label="Tải video cần được nhận diện"
              name="video"
              rules={[
                {
                  required: true,
                  message: ""
                }
              ]}
            >
              <Upload accept=".mp4"
                maxCount={1}
                onChange={handleChange}>
                <Button type="primary" htmlType="submit">

                </Button>
              </Upload>
            </Form.Item>

          </Form> */}
        <Upload accept=".mp4"
          maxCount={1}
          onChange={handleChange}>
          <Button type="primary" htmlType="submit">

          </Button>
        </Upload>
      </Col>

    </Row>
  );
};

export default UserUploadVideo;
