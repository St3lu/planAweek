import React from "react";
import { Card, Col, Row, Layout, Menu, Button } from "antd";
const { Header, Content, Sider } = Layout;

const PlanWeekView = props => {
  return (
    <div
      style={{
        textAlign: "center",
        height: "100vh"
      }}
    >
      <Layout style={{ height: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            overflow: "auto",
            height: "100vh"
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[props.week(new Date()).toString()]}
          >
            {[...Array(53).keys()]
              .splice(props.week(new Date()) - 1, 53)
              .map((value, index) => {
                value = value + 1;
                return (
                  <Menu.Item
                    id={value}
                    key={value}
                    onClick={item => {
                      props.sidebar(item.key);
                    }}
                  >
                    <span className="nav-text">Week {value}</span>
                  </Menu.Item>
                );
              })}
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              backgroundColor: "#f0f2f5",
              padding: 0,
              fontSize: "2.5rem"
            }}
          >
            Plan the Week
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              <Row gutter={16}>
                <Col span={6}>
                  <Card title="Monday" bordered={true}>
                    {props.meals.Monday
                      ? props.meals.Monday.map(el => {
                          return <p key={el}>{el}</p>;
                        })
                      : null}
                    <Button
                      style={{
                        width: "70%",
                        marginTop: "170px"
                      }}
                      onClick={() => props.addMeal("Monday")}
                    >
                      Add meal
                    </Button>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card title="Tuesday" bordered={true}>
                    {props.meals.Tuesday
                      ? props.meals.Tuesday.map(el => {
                          return <p key={el}>{el}</p>;
                        })
                      : null}
                    <Button
                      style={{
                        width: "70%",
                        marginTop: "170px"
                      }}
                      onClick={() => props.addMeal("Tuesday")}
                    >
                      Add meal
                    </Button>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card title="Wednesday" bordered={true}>
                    {props.meals.Wednesday ? (
                      props.meals.Wednesday.map(el => {
                        return <p key={el}>{el}</p>;
                      })
                    ) : (
                      <p />
                    )}
                    <Button
                      style={{
                        width: "70%",
                        marginTop: "170px"
                      }}
                      onClick={() => props.addMeal("Wednesday")}
                    >
                      Add meal
                    </Button>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card title="Thursday" bordered={true}>
                    {props.meals.Thursday
                      ? props.meals.Thursday.map(el => {
                          return <p key={el}>{el}</p>;
                        })
                      : null}
                    <Button
                      style={{
                        width: "70%",
                        marginTop: "170px"
                      }}
                      onClick={() => props.addMeal("Thursday")}
                    >
                      Add meal
                    </Button>
                  </Card>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: "20px" }}>
                <Col span={8}>
                  <Card title="Friday" bordered={true}>
                    {props.meals.Friday
                      ? props.meals.Friday.map(el => {
                          return <p key={el}>{el}</p>;
                        })
                      : null}
                    <Button
                      style={{
                        width: "70%",
                        marginTop: "170px"
                      }}
                      onClick={() => props.addMeal("Friday")}
                    >
                      Add meal
                    </Button>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Saturday" bordered={true}>
                    {props.meals.Saturday
                      ? props.meals.Saturday.map(el => {
                          return <p key={el}>{el}</p>;
                        })
                      : null}
                    <Button
                      style={{
                        width: "70%",
                        marginTop: "170px"
                      }}
                      onClick={() => props.addMeal("Saturday")}
                    >
                      Add meal
                    </Button>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Sunday" bordered={true}>
                    {props.meals.Sunday
                      ? props.meals.Sunday.map(el => {
                          return <p key={el}>{el}</p>;
                        })
                      : null}
                    <Button
                      style={{
                        width: "70%",
                        marginTop: "170px"
                      }}
                      onClick={() => props.addMeal("Sunday")}
                    >
                      Add meal
                    </Button>
                  </Card>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default PlanWeekView;
