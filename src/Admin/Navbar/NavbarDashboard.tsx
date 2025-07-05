import React, { useState } from "react";
import {
  DashboardOutlined,
  GlobalOutlined,
  LinkOutlined,
  FileOutlined,
  PictureOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  Card,
  Form,
  Input,
  Upload,
  Switch,
  message,
} from "antd";
import type { UploadProps } from "antd";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

const { Header, Sider, Content } = Layout;

interface SocialLink {
  platform: string;
  url: string;
  active: boolean;
}

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  active: boolean;
}

interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  active: boolean;
}

interface Language {
  code: string;
  name: string;
  active: boolean;
}

const AdminPanel: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: "facebook", url: "https://facebook.com", active: true },
    { platform: "twitter", url: "https://twitter.com", active: true },
    { platform: "instagram", url: "https://instagram.com", active: true },
    { platform: "linkedin", url: "https://linkedin.com", active: false },
    { platform: "whatsapp", url: "https://wa.me/1234567890", active: false },
  ]);
  const [pages, setPages] = useState<Page[]>([
    {
      id: "1",
      title: "Home",
      slug: "home",
      content: "<p>Welcome to our website</p>",
      active: true,
    },
    {
      id: "2",
      title: "About Us",
      slug: "about",
      content: "<p>About our company</p>",
      active: true,
    },
    {
      id: "3",
      title: "Contact",
      slug: "contact",
      content: "<p>Contact information</p>",
      active: true,
    },
  ]);
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      title: "Web Development",
      description: "Custom website development services",
      imageUrl: "https://via.placeholder.com/300x200?text=Web+Development",
      active: true,
    },
    {
      id: "2",
      title: "SEO Services",
      description: "Search engine optimization services",
      imageUrl: "https://via.placeholder.com/300x200?text=SEO+Services",
      active: true,
    },
  ]);
  const [languages, setLanguages] = useState<Language[]>([
    { code: "en", name: "English", active: true },
    { code: "es", name: "Spanish", active: false },
    { code: "fr", name: "French", active: false },
  ]);
  const [form] = Form.useForm();
  const [pageForm] = Form.useForm();
  const [serviceForm] = Form.useForm();

  // Handle logo upload
  const handleLogoUpload: UploadProps["beforeUpload"] = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result as string);
      message.success("Logo uploaded successfully!");
    };
    reader.readAsDataURL(file);
    return false;
  };

  // Save social links
  const saveSocialLinks = (values: any) => {
    const updatedLinks = socialLinks.map((link) => ({
      ...link,
      url: values[link.platform] || "",
      active: values[`${link.platform}_active`] || false,
    }));
    setSocialLinks(updatedLinks);
    message.success("Social links saved successfully!");
  };

  // Save pages
  const savePage = (values: any) => {
    if (values.id) {
      // Update existing page
      setPages(
        pages.map((page) =>
          page.id === values.id ? { ...page, ...values } : page
        )
      );
    } else {
      // Add new page
      setPages([...pages, { ...values, id: Date.now().toString() }]);
    }
    pageForm.resetFields();
    message.success("Page saved successfully!");
  };

  // Save service
  const saveService = (values: any) => {
    if (values.id) {
      // Update existing service
      setServices(
        services.map((service) =>
          service.id === values.id ? { ...service, ...values } : service
        )
      );
    } else {
      // Add new service
      setServices([...services, { ...values, id: Date.now().toString() }]);
    }
    serviceForm.resetFields();
    message.success("Service saved successfully!");
  };

  // Save languages
  const saveLanguages = (values: any) => {
    setLanguages(
      languages.map((lang) => ({
        ...lang,
        active: values[lang.code] || false,
      }))
    );
    message.success("Language settings saved successfully!");
  };

  // Edit page
  const editPage = (page: Page) => {
    pageForm.setFieldsValue(page);
  };

  // Edit service
  const editService = (service: Service) => {
    serviceForm.setFieldsValue(service);
  };

  // Delete page
  const deletePage = (id: string) => {
    setPages(pages.filter((page) => page.id !== id));
    message.success("Page deleted successfully!");
  };

  // Delete service
  const deleteService = (id: string) => {
    setServices(services.filter((service) => service.id !== id));
    message.success("Service deleted successfully!");
  };

  // Get platform icon
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <FaFacebookF />;
      case "twitter":
        return <FaTwitter />;
      case "instagram":
        return <FaInstagram />;
      case "linkedin":
        return <FaLinkedinIn />;
      case "whatsapp":
        return <FaWhatsapp />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#1a1a1a" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          background: "#1a1a1a",
          borderRight: "1px solid #333",
        }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
            borderBottom: "2px solid #ff0000",
          }}
        >
          <h1
            style={{
              color: "#fff",
              margin: 0,
              fontSize: collapsed ? "16px" : "20px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {collapsed ? "AD" : "ADMIN DASHBOARD"}
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenu]}
          onSelect={({ key }) => setSelectedMenu(key)}
          style={{ background: "#1a1a1a" }}
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "logo",
              icon: <PictureOutlined />,
              label: "Logo Settings",
            },
            {
              key: "social",
              icon: <LinkOutlined />,
              label: "Social Links",
            },
            {
              key: "pages",
              icon: <FileOutlined />,
              label: "Pages",
            },
            {
              key: "services",
              icon: <SettingOutlined />,
              label: "Services",
            },
            {
              key: "languages",
              icon: <GlobalOutlined />,
              label: "Languages",
            },
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Logout",
              style: { marginTop: "auto", borderTop: "1px solid #333" },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #333",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "#fff",
            }}
          />
          <div style={{ marginRight: "24px", color: "#fff" }}>
            Welcome, Admin
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#1a1a1a",
            borderRadius: "8px",
          }}
        >
          {selectedMenu === "dashboard" && (
            <div>
              <h2 style={{ color: "#fff", marginBottom: "20px" }}>
                Dashboard Overview
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: "20px",
                }}
              >
                <Card
                  title="Active Pages"
                  bordered={false}
                  headStyle={{ background: "#ff0000", color: "#fff" }}
                  style={{ background: "#222", color: "#fff" }}
                >
                  <h3 style={{ color: "#fff", fontSize: "24px" }}>
                    {pages.filter((p) => p.active).length}
                  </h3>
                </Card>
                <Card
                  title="Active Services"
                  bordered={false}
                  headStyle={{ background: "#ff0000", color: "#fff" }}
                  style={{ background: "#222", color: "#fff" }}
                >
                  <h3 style={{ color: "#fff", fontSize: "24px" }}>
                    {services.filter((s) => s.active).length}
                  </h3>
                </Card>
                <Card
                  title="Active Languages"
                  bordered={false}
                  headStyle={{ background: "#ff0000", color: "#fff" }}
                  style={{ background: "#222", color: "#fff" }}
                >
                  <h3 style={{ color: "#fff", fontSize: "24px" }}>
                    {languages.filter((l) => l.active).length}
                  </h3>
                </Card>
                <Card
                  title="Active Social Links"
                  bordered={false}
                  headStyle={{ background: "#ff0000", color: "#fff" }}
                  style={{ background: "#222", color: "#fff" }}
                >
                  <h3 style={{ color: "#fff", fontSize: "24px" }}>
                    {socialLinks.filter((s) => s.active).length}
                  </h3>
                </Card>
              </div>
            </div>
          )}

          {selectedMenu === "logo" && (
            <div>
              <h2 style={{ color: "#fff", marginBottom: "20px" }}>
                Logo Settings
              </h2>
              <Card
                bordered={false}
                style={{
                  background: "#222",
                  color: "#fff",
                  marginBottom: "20px",
                }}
              >
                <Form layout="vertical">
                  <Form.Item label="Current Logo" style={{ color: "#fff" }}>
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        style={{
                          maxWidth: "200px",
                          maxHeight: "100px",
                          border: "1px solid #333",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "200px",
                          height: "100px",
                          border: "1px dashed #333",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#666",
                        }}
                      >
                        No logo uploaded
                      </div>
                    )}
                  </Form.Item>
                  <Form.Item label="Upload New Logo" style={{ color: "#fff" }}>
                    <Upload
                      name="logo"
                      listType="picture-card"
                      showUploadList={false}
                      beforeUpload={handleLogoUpload}
                      accept="image/*"
                    >
                      <Button
                        type="primary"
                        style={{
                          background: "#ff0000",
                          borderColor: "#ff0000",
                        }}
                      >
                        Select Logo
                      </Button>
                    </Upload>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          )}

          {selectedMenu === "social" && (
            <div>
              <h2 style={{ color: "#fff", marginBottom: "20px" }}>
                Social Links
              </h2>
              <Card
                bordered={false}
                style={{
                  background: "#222",
                  color: "#fff",
                  marginBottom: "20px",
                }}
              >
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={socialLinks.reduce(
                    (acc, link) => ({
                      ...acc,
                      [link.platform]: link.url,
                      [`${link.platform}_active`]: link.active,
                    }),
                    {}
                  )}
                  onFinish={saveSocialLinks}
                >
                  {socialLinks.map((link) => (
                    <div key={link.platform} style={{ marginBottom: "16px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "8px",
                          color: "#fff",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "24px",
                            height: "24px",
                            marginRight: "8px",
                            color: "#fff",
                          }}
                        >
                          {getPlatformIcon(link.platform)}
                        </span>
                        <span style={{ textTransform: "capitalize" }}>
                          {link.platform}
                        </span>
                        <Form.Item
                          name={`${link.platform}_active`}
                          valuePropName="checked"
                          style={{ margin: "0 0 0 auto" }}
                        >
                          <Switch />
                        </Form.Item>
                      </div>
                      <Form.Item
                        name={link.platform}
                        rules={[
                          {
                            type: "url",
                            message:
                              "Please enter a valid URL (include http:// or https://)",
                          },
                        ]}
                      >
                        <Input
                          placeholder={`Enter ${link.platform} URL`}
                          style={{
                            background: "#333",
                            color: "#fff",
                            borderColor: "#444",
                          }}
                        />
                      </Form.Item>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ background: "#ff0000", borderColor: "#ff0000" }}
                    >
                      Save Social Links
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          )}

          {selectedMenu === "pages" && (
            <div>
              <h2 style={{ color: "#fff", marginBottom: "20px" }}>
                Pages Management
              </h2>
              <Card
                bordered={false}
                style={{
                  background: "#222",
                  color: "#fff",
                  marginBottom: "20px",
                }}
              >
                <h3 style={{ color: "#fff", marginBottom: "16px" }}>
                  Add/Edit Page
                </h3>
                <Form form={pageForm} layout="vertical" onFinish={savePage}>
                  <Form.Item name="id" hidden>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="title"
                    label="Page Title"
                    rules={[
                      { required: true, message: "Please enter page title" },
                    ]}
                    style={{ color: "#fff" }}
                  >
                    <Input
                      style={{
                        background: "#333",
                        color: "#fff",
                        borderColor: "#444",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="slug"
                    label="Page Slug"
                    rules={[
                      { required: true, message: "Please enter page slug" },
                    ]}
                    style={{ color: "#fff" }}
                  >
                    <Input
                      style={{
                        background: "#333",
                        color: "#fff",
                        borderColor: "#444",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="content"
                    label="Page Content"
                    rules={[
                      { required: true, message: "Please enter page content" },
                    ]}
                    style={{ color: "#fff" }}
                  >
                    <Input.TextArea
                      rows={6}
                      style={{
                        background: "#333",
                        color: "#fff",
                        borderColor: "#444",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="active"
                    label="Active"
                    valuePropName="checked"
                    style={{ color: "#fff" }}
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        background: "#ff0000",
                        borderColor: "#ff0000",
                        marginRight: "8px",
                      }}
                    >
                      Save Page
                    </Button>
                    <Button
                      onClick={() => pageForm.resetFields()}
                      style={{
                        background: "#333",
                        borderColor: "#444",
                        color: "#fff",
                      }}
                    >
                      Clear
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
              <Card
                bordered={false}
                style={{ background: "#222", color: "#fff" }}
              >
                <h3 style={{ color: "#fff", marginBottom: "16px" }}>
                  Existing Pages
                </h3>
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  {pages.length === 0 ? (
                    <p style={{ color: "#666" }}>No pages created yet</p>
                  ) : (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "16px",
                      }}
                    >
                      {pages.map((page) => (
                        <Card
                          key={page.id}
                          bordered={true}
                          style={{
                            background: "#252525",
                            borderColor: page.active ? "#ff0000" : "#444",
                            position: "relative",
                          }}
                        >
                          <h4
                            style={{
                              color: page.active ? "#ff0000" : "#fff",
                              marginBottom: "8px",
                            }}
                          >
                            {page.title}
                          </h4>
                          <p
                            style={{
                              color: "#aaa",
                              marginBottom: "8px",
                              fontSize: "12px",
                            }}
                          >
                            /{page.slug}
                          </p>
                          <div
                            style={{
                              position: "absolute",
                              top: "8px",
                              right: "8px",
                              display: "flex",
                              gap: "8px",
                            }}
                          >
                            <Button
                              size="small"
                              onClick={() => editPage(page)}
                              style={{
                                background: "#333",
                                borderColor: "#444",
                                color: "#fff",
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              size="small"
                              danger
                              onClick={() => deletePage(page.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}

          {selectedMenu === "services" && (
            <div>
              <h2 style={{ color: "#fff", marginBottom: "20px" }}>
                Services Management
              </h2>
              <Card
                bordered={false}
                style={{
                  background: "#222",
                  color: "#fff",
                  marginBottom: "20px",
                }}
              >
                <h3 style={{ color: "#fff", marginBottom: "16px" }}>
                  Add/Edit Service
                </h3>
                <Form
                  form={serviceForm}
                  layout="vertical"
                  onFinish={saveService}
                >
                  <Form.Item name="id" hidden>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="title"
                    label="Service Title"
                    rules={[
                      { required: true, message: "Please enter service title" },
                    ]}
                    style={{ color: "#fff" }}
                  >
                    <Input
                      style={{
                        background: "#333",
                        color: "#fff",
                        borderColor: "#444",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    label="Service Description"
                    rules={[
                      {
                        required: true,
                        message: "Please enter service description",
                      },
                    ]}
                    style={{ color: "#fff" }}
                  >
                    <Input.TextArea
                      rows={4}
                      style={{
                        background: "#333",
                        color: "#fff",
                        borderColor: "#444",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="imageUrl"
                    label="Image URL"
                    rules={[
                      { required: true, message: "Please enter image URL" },
                    ]}
                    style={{ color: "#fff" }}
                  >
                    <Input
                      style={{
                        background: "#333",
                        color: "#fff",
                        borderColor: "#444",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="active"
                    label="Active"
                    valuePropName="checked"
                    style={{ color: "#fff" }}
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        background: "#ff0000",
                        borderColor: "#ff0000",
                        marginRight: "8px",
                      }}
                    >
                      Save Service
                    </Button>
                    <Button
                      onClick={() => serviceForm.resetFields()}
                      style={{
                        background: "#333",
                        borderColor: "#444",
                        color: "#fff",
                      }}
                    >
                      Clear
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
              <Card
                bordered={false}
                style={{ background: "#222", color: "#fff" }}
              >
                <h3 style={{ color: "#fff", marginBottom: "16px" }}>
                  Existing Services
                </h3>
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  {services.length === 0 ? (
                    <p style={{ color: "#666" }}>No services created yet</p>
                  ) : (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "16px",
                      }}
                    >
                      {services.map((service) => (
                        <Card
                          key={service.id}
                          bordered={true}
                          style={{
                            background: "#252525",
                            borderColor: service.active ? "#ff0000" : "#444",
                            position: "relative",
                          }}
                          cover={
                            service.imageUrl ? (
                              <img
                                alt={service.title}
                                src={service.imageUrl}
                                style={{
                                  height: "150px",
                                  objectFit: "cover",
                                  borderBottom: "1px solid #444",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  height: "150px",
                                  background: "#333",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "#666",
                                  borderBottom: "1px solid #444",
                                }}
                              >
                                No Image
                              </div>
                            )
                          }
                        >
                          <h4
                            style={{
                              color: service.active ? "#ff0000" : "#fff",
                              marginBottom: "8px",
                            }}
                          >
                            {service.title}
                          </h4>
                          <p
                            style={{
                              color: "#aaa",
                              fontSize: "12px",
                              marginBottom: "0",
                            }}
                          >
                            {service.description.substring(0, 60)}...
                          </p>
                          <div
                            style={{
                              position: "absolute",
                              top: "8px",
                              right: "8px",
                              display: "flex",
                              gap: "8px",
                            }}
                          >
                            <Button
                              size="small"
                              onClick={() => editService(service)}
                              style={{
                                background: "#333",
                                borderColor: "#444",
                                color: "#fff",
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              size="small"
                              danger
                              onClick={() => deleteService(service.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}

          {selectedMenu === "languages" && (
            <div>
              <h2 style={{ color: "#fff", marginBottom: "20px" }}>
                Language Settings
              </h2>
              <Card
                bordered={false}
                style={{ background: "#222", color: "#fff" }}
              >
                <Form
                  layout="vertical"
                  initialValues={languages.reduce(
                    (acc, lang) => ({
                      ...acc,
                      [lang.code]: lang.active,
                    }),
                    {}
                  )}
                  onFinish={saveLanguages}
                >
                  {languages.map((lang) => (
                    <Form.Item
                      key={lang.code}
                      name={lang.code}
                      label={`${lang.name} (${lang.code.toUpperCase()})`}
                      valuePropName="checked"
                      style={{ color: "#fff" }}
                    >
                      <Switch />
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ background: "#ff0000", borderColor: "#ff0000" }}
                    >
                      Save Language Settings
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
