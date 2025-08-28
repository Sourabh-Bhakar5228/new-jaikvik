import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FaSave,
  FaFileExport,
  FaFileImport,
  FaLock,
  FaUnlock,
  FaUpload,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

interface AboutContent {
  aboutPage: {
    heroSection: {
      title: string;
      subtitle: string;
      backgroundImage: string;
      ctaButton: {
        text: string;
        link: string;
      };
    };
    aboutSection: {
      title: string;
      content: string[];
    };
    missionVision: {
      mission: {
        title: string;
        content: string;
      };
      vision: {
        title: string;
        content: string;
      };
    };
    whyUs: {
      title: string;
      description: string;
      specializationText: string;
      services: Array<{
        title: string;
        description: string;
      }>;
      image: string;
    };
    stats: {
      title: string;
      stats: Array<{
        value: number;
        label: string;
        dataId: string;
      }>;
    };
    whyChooseUs: {
      title: string;
      points: Array<{
        title: string;
        value: number;
        description: string;
      }>;
      conclusion: string;
      image: string;
    };
    promoters: Array<{
      name: string;
      role: string;
      image: string;
      bio: string[];
      companies: string[];
      additionalInfo: string[];
      color: string;
      accent: string;
    }>;
    clients: {
      title: string;
      logos: Array<{
        name: string;
        logo: string;
      }>;
    };
    cta: {
      title: string;
      description: string;
      button: {
        text: string;
        link: string;
      };
    };
  };
}

const defaultContent: AboutContent = {
  aboutPage: {
    heroSection: {
      title: "About Jaikvik Technology",
      subtitle: "Empowering Businesses Through Digital Innovation Since 2016",
      backgroundImage:
        "https://images.unsplash.com/photo-1634482899780-6ac6b92c656e?w=600&auto=format&fit=crop&q=60",
      ctaButton: {
        text: "Discover Our Story",
        link: "#about",
      },
    },
    aboutSection: {
      title: "Who We Are",
      content: [
        "Established in 2016, Jaikvik Technology started as a partnership...",
        "Headquartered in India, we are a dynamic team of software developers...",
      ],
    },
    missionVision: {
      mission: {
        title: "Our Mission",
        content:
          "To empower businesses of all sizes with cutting-edge digital solutions...",
      },
      vision: {
        title: "Our Vision",
        content: "To be a global leader in digital solutions...",
      },
    },
    whyUs: {
      title: "Comprehensive Digital Solutions",
      description:
        "Jaikvik Technology provides a comprehensive suite of services...",
      specializationText: "We specialize in:",
      services: [
        {
          title: "Customised Software Development",
          description: "Provision of tailor-made software solutions...",
        },
        {
          title: "Mobile Application Development",
          description: "Development of appealing, easy-to-use apps...",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1559165317-9f3837ba893e?w=600&auto=format&fit=crop&q=60",
    },
    stats: {
      title: "Our Impact in Numbers",
      stats: [
        { value: 9, label: "Years of Experience", dataId: "9" },
        { value: 500, label: "Happy Clients", dataId: "500" },
      ],
    },
    whyChooseUs: {
      title: "What Sets Us Apart",
      points: [
        {
          title: "Experience & Evolution",
          value: 90,
          description: "With close to 10 years of industrial existence...",
        },
      ],
      conclusion: "Jaikvik Technology doesn't just build solutions...",
      image:
        "https://images.unsplash.com/photo-1551822620-ac3afd8acd1f?w=600&auto=format&fit=crop&q=60",
    },
    promoters: [
      {
        name: "Vikas Jaiswal",
        role: "Managing Director",
        image:
          "https://plus.unsplash.com/premium_photo-1669530939363-6dd44d3b3436?w=600&auto=format&fit=crop&q=60",
        bio: ["The foundation of Jaikvik Technology..."],
        companies: ["Dell", "Airtel"],
        additionalInfo: ["Hailing from a background rich in technology..."],
        color: "from-purple-500 to-pink-500",
        accent: "purple-500",
      },
    ],
    clients: {
      title: "Trusted By Industry Leaders",
      logos: [
        {
          name: "Glow Green Pvt Ltd",
          logo: "https://www.glowgreen.in/website/images/logo/logo.png",
        },
      ],
    },
    cta: {
      title: "Ready to Transform Your Digital Presence?",
      description: "Let's discuss how Jaikvik Technology can help...",
      button: {
        text: "Get In Touch",
        link: "/contact-us",
      },
    },
  },
};

const AdminPanel: React.FC = () => {
  const [content, setContent] = useState<AboutContent>(defaultContent);
  const [isLocked, setIsLocked] = useState(true);
  const { register, handleSubmit, reset, watch, setValue } =
    useForm<AboutContent>({
      defaultValues: defaultContent,
    });

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem("aboutContent");
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setContent(parsed);
        reset(parsed);
      } catch (e) {
        console.error("Failed to parse saved content", e);
      }
    }
  }, [reset]);

  // Save to localStorage whenever form changes (debounced)
  useEffect(() => {
    if (!isLocked) {
      const subscription = watch((value) => {
        const debounceTimer = setTimeout(() => {
          localStorage.setItem("aboutContent", JSON.stringify(value));
          setContent(value as AboutContent);
        }, 500);
        return () => clearTimeout(debounceTimer);
      });
      return () => subscription.unsubscribe();
    }
  }, [watch, isLocked]);

  const handleSave = (data: AboutContent) => {
    localStorage.setItem("aboutContent", JSON.stringify(data));
    setContent(data);
    alert("Content saved successfully!");
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(content, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "jaikvik-about-content.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        setContent(imported);
        reset(imported);
        localStorage.setItem("aboutContent", JSON.stringify(imported));
        alert("Content imported successfully!");
      } catch (e) {
        alert("Failed to parse the file. Please check the format.");
      }
    };
    reader.readAsText(file);
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    if (!isLocked) {
      const currentValues = watch();
      localStorage.setItem("aboutContent", JSON.stringify(currentValues));
      setContent(currentValues as AboutContent);
    }
  };

  const handleImageUpload = (
    fieldName: any,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setValue(fieldName, imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const addArrayItem = (fieldName: any, defaultValue: any) => {
    const currentValue = watch(fieldName);
    setValue(fieldName, [...currentValue, defaultValue]);
  };

  const removeArrayItem = (fieldName: any, index: number) => {
    const currentValue = watch(fieldName);
    setValue(
      fieldName,
      currentValue.filter((_: any, i: number) => i !== index)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-900 p-6 text-white">
      <div className="bg-black bg-opacity-70 p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-red-400">
            About Page Content Editor
          </h1>
          <div className="flex gap-2">
            <button
              onClick={toggleLock}
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                isLocked
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-yellow-600 hover:bg-yellow-700"
              } text-white transition-colors`}
            >
              {isLocked ? (
                <>
                  <FaUnlock /> Unlock Editing
                </>
              ) : (
                <>
                  <FaLock /> Lock Editing
                </>
              )}
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
            >
              <FaFileExport /> Export JSON
            </button>
            <label className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer transition-colors">
              <FaFileImport /> Import JSON
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            {!isLocked && (
              <button
                onClick={handleSubmit(handleSave)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
              >
                <FaSave /> Save
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
          {/* Hero Section */}
          <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b border-red-500 pb-2 text-red-400">
              Hero Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  {...register("aboutPage.heroSection.title")}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Subtitle</label>
                <input
                  {...register("aboutPage.heroSection.subtitle")}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                  disabled={isLocked}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">
                  Background Image
                </label>
                <div className="flex gap-2">
                  <input
                    {...register("aboutPage.heroSection.backgroundImage")}
                    className="flex-1 px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                    disabled={isLocked}
                  />
                  <label className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer transition-colors">
                    <FaUpload /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(
                          "aboutPage.heroSection.backgroundImage",
                          e
                        )
                      }
                      className="hidden"
                      disabled={isLocked}
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  CTA Button Text
                </label>
                <input
                  {...register("aboutPage.heroSection.ctaButton.text")}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  CTA Button Link
                </label>
                <input
                  {...register("aboutPage.heroSection.ctaButton.link")}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                  disabled={isLocked}
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b border-red-500 pb-2 text-red-400">
              About Section
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">
                  Section Title
                </label>
                <input
                  {...register("aboutPage.aboutSection.title")}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                  disabled={isLocked}
                />
              </div>
              {watch("aboutPage.aboutSection.content")?.map((_, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <label className="block text-gray-300 mb-2">
                      Paragraph {index + 1}
                    </label>
                    <textarea
                      {...register(`aboutPage.aboutSection.content.${index}`)}
                      className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white min-h-[100px]"
                      disabled={isLocked}
                    />
                  </div>
                  {!isLocked && (
                    <button
                      type="button"
                      onClick={() =>
                        removeArrayItem("aboutPage.aboutSection.content", index)
                      }
                      className="mt-7 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      <FaMinus />
                    </button>
                  )}
                </div>
              ))}
              {!isLocked && (
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem(
                      "aboutPage.aboutSection.content",
                      "New paragraph text"
                    )
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  <FaPlus /> Add Paragraph
                </button>
              )}
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b border-red-500 pb-2 text-red-400">
              Mission & Vision
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="text-lg font-medium mb-3 text-red-400">
                  Mission
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Title</label>
                    <input
                      {...register("aboutPage.missionVision.mission.title")}
                      className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white"
                      disabled={isLocked}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Content</label>
                    <textarea
                      {...register("aboutPage.missionVision.mission.content")}
                      className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white min-h-[120px]"
                      disabled={isLocked}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="text-lg font-medium mb-3 text-red-400">
                  Vision
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Title</label>
                    <input
                      {...register("aboutPage.missionVision.vision.title")}
                      className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white"
                      disabled={isLocked}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Content</label>
                    <textarea
                      {...register("aboutPage.missionVision.vision.content")}
                      className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white min-h-[120px]"
                      disabled={isLocked}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Us Section */}
          <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b border-red-500 pb-2 text-red-400">
              Why Us Section
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  {...register("aboutPage.whyUs.title")}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  {...register("aboutPage.whyUs.description")}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white min-h-[100px]"
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  Specialization Text
                </label>
                <input
                  {...register("aboutPage.whyUs.specializationText")}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Image</label>
                <div className="flex gap-2">
                  <input
                    {...register("aboutPage.whyUs.image")}
                    className="flex-1 px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                    disabled={isLocked}
                  />
                  <label className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer transition-colors">
                    <FaUpload /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload("aboutPage.whyUs.image", e)
                      }
                      className="hidden"
                      disabled={isLocked}
                    />
                  </label>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3 text-red-400">
                  Services
                </h3>
                <div className="space-y-4">
                  {watch("aboutPage.whyUs.services")?.map((_, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-300">
                          Service {index + 1}
                        </h4>
                        {!isLocked && (
                          <button
                            type="button"
                            onClick={() =>
                              removeArrayItem("aboutPage.whyUs.services", index)
                            }
                            className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                          >
                            <FaMinus />
                          </button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-gray-300 mb-1">
                            Title
                          </label>
                          <input
                            {...register(
                              `aboutPage.whyUs.services.${index}.title`
                            )}
                            className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white"
                            disabled={isLocked}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-1">
                            Description
                          </label>
                          <textarea
                            {...register(
                              `aboutPage.whyUs.services.${index}.description`
                            )}
                            className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white min-h-[80px]"
                            disabled={isLocked}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {!isLocked && (
                    <button
                      type="button"
                      onClick={() =>
                        addArrayItem("aboutPage.whyUs.services", {
                          title: "",
                          description: "",
                        })
                      }
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      <FaPlus /> Add Service
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b border-red-500 pb-2 text-red-400">
              Stats Section
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  {...register("aboutPage.stats.title")}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                  disabled={isLocked}
                />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3 text-red-400">
                  Statistics
                </h3>
                <div className="space-y-4">
                  {watch("aboutPage.stats.stats")?.map((_, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-300">
                          Stat {index + 1}
                        </h4>
                        {!isLocked && (
                          <button
                            type="button"
                            onClick={() =>
                              removeArrayItem("aboutPage.stats.stats", index)
                            }
                            className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                          >
                            <FaMinus />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-gray-300 mb-1">
                            Value
                          </label>
                          <input
                            type="number"
                            {...register(
                              `aboutPage.stats.stats.${index}.value`,
                              { valueAsNumber: true }
                            )}
                            className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white"
                            disabled={isLocked}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-1">
                            Label
                          </label>
                          <input
                            {...register(
                              `aboutPage.stats.stats.${index}.label`
                            )}
                            className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white"
                            disabled={isLocked}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-1">
                            Data ID
                          </label>
                          <input
                            {...register(
                              `aboutPage.stats.stats.${index}.dataId`
                            )}
                            className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white"
                            disabled={isLocked}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {!isLocked && (
                    <button
                      type="button"
                      onClick={() =>
                        addArrayItem("aboutPage.stats.stats", {
                          value: 0,
                          label: "",
                          dataId: "",
                        })
                      }
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      <FaPlus /> Add Statistic
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b border-red-500 pb-2 text-red-400">
              Why Choose Us
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  {...register("aboutPage.whyChooseUs.title")}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Image</label>
                <div className="flex gap-2">
                  <input
                    {...register("aboutPage.whyChooseUs.image")}
                    className="flex-1 px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                    disabled={isLocked}
                  />
                  <label className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer transition-colors">
                    <FaUpload /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload("aboutPage.whyChooseUs.image", e)
                      }
                      className="hidden"
                      disabled={isLocked}
                    />
                  </label>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3 text-red-400">
                  Points
                </h3>
                <div className="space-y-4">
                  {watch("aboutPage.whyChooseUs.points")?.map((_, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-300">
                          Point {index + 1}
                        </h4>
                        {!isLocked && (
                          <button
                            type="button"
                            onClick={() =>
                              removeArrayItem(
                                "aboutPage.whyChooseUs.points",
                                index
                              )
                            }
                            className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                          >
                            <FaMinus />
                          </button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-gray-300 mb-1">
                            Title
                          </label>
                          <input
                            {...register(
                              `aboutPage.whyChooseUs.points.${index}.title`
                            )}
                            className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white"
                            disabled={isLocked}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-1">
                            Value (%)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            {...register(
                              `aboutPage.whyChooseUs.points.${index}.value`,
                              { valueAsNumber: true }
                            )}
                            className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white"
                            disabled={isLocked}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-1">
                            Description
                          </label>
                          <textarea
                            {...register(
                              `aboutPage.whyChooseUs.points.${index}.description`
                            )}
                            className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white min-h-[80px]"
                            disabled={isLocked}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {!isLocked && (
                    <button
                      type="button"
                      onClick={() =>
                        addArrayItem("aboutPage.whyChooseUs.points", {
                          title: "",
                          value: 0,
                          description: "",
                        })
                      }
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      <FaPlus /> Add Point
                    </button>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Conclusion</label>
                <textarea
                  {...register("aboutPage.whyChooseUs.conclusion")}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white min-h-[100px]"
                  disabled={isLocked}
                />
              </div>
            </div>
          </div>

          {/* Promoters Section */}
          <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b border-red-500 pb-2 text-red-400">
              Promoters Section
            </h2>
            <div className="space-y-4">
              {watch("aboutPage.promoters")?.map((_, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-red-400">
                      Promoter {index + 1}
                    </h3>
                    {!isLocked && (
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayItem("aboutPage.promoters", index)
                        }
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                      >
                        <FaMinus />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-1">Name</label>
                      <input
                        {...register(`aboutPage.promoters.${index}.name`)}
                        className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white"
                        disabled={isLocked}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-1">Role</label>
                      <input
                        {...register(`aboutPage.promoters.${index}.role`)}
                        className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white"
                        disabled={isLocked}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-1">Image</label>
                      <div className="flex gap-2">
                        <input
                          {...register(`aboutPage.promoters.${index}.image`)}
                          className="flex-1 px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white"
                          disabled={isLocked}
                        />
                        <label className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded cursor-pointer transition-colors">
                          <FaUpload /> Upload
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(
                                `aboutPage.promoters.${index}.image`,
                                e
                              )
                            }
                            className="hidden"
                            disabled={isLocked}
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-1">
                        Color Gradient
                      </label>
                      <input
                        {...register(`aboutPage.promoters.${index}.color`)}
                        className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white"
                        disabled={isLocked}
                        placeholder="e.g., from-purple-500 to-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-1">
                        Accent Color
                      </label>
                      <input
                        {...register(`aboutPage.promoters.${index}.accent`)}
                        className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white"
                        disabled={isLocked}
                        placeholder="e.g., purple-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="block text-gray-300 mb-1">Bio</label>
                      {watch(`aboutPage.promoters.${index}.bio`)?.map(
                        (_, bioIndex) => (
                          <div key={bioIndex} className="flex gap-2 mb-2">
                            <textarea
                              {...register(
                                `aboutPage.promoters.${index}.bio.${bioIndex}`
                              )}
                              className="flex-1 px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white min-h-[60px]"
                              disabled={isLocked}
                            />
                            {!isLocked && (
                              <button
                                type="button"
                                onClick={() => {
                                  const currentBio = watch(
                                    `aboutPage.promoters.${index}.bio`
                                  );
                                  setValue(
                                    `aboutPage.promoters.${index}.bio`,
                                    currentBio.filter((_, i) => i !== bioIndex)
                                  );
                                }}
                                className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded self-start"
                              >
                                <FaMinus />
                              </button>
                            )}
                          </div>
                        )
                      )}
                      {!isLocked && (
                        <button
                          type="button"
                          onClick={() => {
                            const currentBio =
                              watch(`aboutPage.promoters.${index}.bio`) || [];
                            setValue(`aboutPage.promoters.${index}.bio`, [
                              ...currentBio,
                              "",
                            ]);
                          }}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                        >
                          <FaPlus /> Add Bio Paragraph
                        </button>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-1">
                        Companies
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {watch(`aboutPage.promoters.${index}.companies`)?.map(
                          (_, companyIndex) => (
                            <div
                              key={companyIndex}
                              className="flex items-center gap-1 bg-gray-700 px-3 py-1 rounded"
                            >
                              <input
                                {...register(
                                  `aboutPage.promoters.${index}.companies.${companyIndex}`
                                )}
                                className="bg-transparent border-none focus:ring-0 text-white"
                                disabled={isLocked}
                              />
                              {!isLocked && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentCompanies = watch(
                                      `aboutPage.promoters.${index}.companies`
                                    );
                                    setValue(
                                      `aboutPage.promoters.${index}.companies`,
                                      currentCompanies.filter(
                                        (_, i) => i !== companyIndex
                                      )
                                    );
                                  }}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <FaMinus size={12} />
                                </button>
                              )}
                            </div>
                          )
                        )}
                      </div>
                      {!isLocked && (
                        <button
                          type="button"
                          onClick={() => {
                            const currentCompanies =
                              watch(`aboutPage.promoters.${index}.companies`) ||
                              [];
                            setValue(`aboutPage.promoters.${index}.companies`, [
                              ...currentCompanies,
                              "",
                            ]);
                          }}
                          className="mt-2 flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                        >
                          <FaPlus /> Add Company
                        </button>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-1">
                        Additional Info
                      </label>
                      {watch(
                        `aboutPage.promoters.${index}.additionalInfo`
                      )?.map((_, infoIndex) => (
                        <div key={infoIndex} className="flex gap-2 mb-2">
                          <textarea
                            {...register(
                              `aboutPage.promoters.${index}.additionalInfo.${infoIndex}`
                            )}
                            className="flex-1 px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white min-h-[60px]"
                            disabled={isLocked}
                          />
                          {!isLocked && (
                            <button
                              type="button"
                              onClick={() => {
                                const currentInfo = watch(
                                  `aboutPage.promoters.${index}.additionalInfo`
                                );
                                setValue(
                                  `aboutPage.promoters.${index}.additionalInfo`,
                                  currentInfo.filter((_, i) => i !== infoIndex)
                                );
                              }}
                              className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded self-start"
                            >
                              <FaMinus />
                            </button>
                          )}
                        </div>
                      ))}
                      {!isLocked && (
                        <button
                          type="button"
                          onClick={() => {
                            const currentInfo =
                              watch(
                                `aboutPage.promoters.${index}.additionalInfo`
                              ) || [];
                            setValue(
                              `aboutPage.promoters.${index}.additionalInfo`,
                              [...currentInfo, ""]
                            );
                          }}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                        >
                          <FaPlus /> Add Info Paragraph
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {!isLocked && (
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem("aboutPage.promoters", {
                      name: "",
                      role: "",
                      image: "",
                      bio: [""],
                      companies: [],
                      additionalInfo: [""],
                      color: "",
                      accent: "",
                    })
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  <FaPlus /> Add Promoter
                </button>
              )}
            </div>
          </div>

          {/* Clients Section */}
          <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b border-red-500 pb-2 text-red-400">
              Clients Section
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  {...register("aboutPage.clients.title")}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                  disabled={isLocked}
                />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3 text-red-400">
                  Client Logos
                </h3>
                <div className="space-y-4">
                  {watch("aboutPage.clients.logos")?.map((_, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-300">
                          Client {index + 1}
                        </h4>
                        {!isLocked && (
                          <button
                            type="button"
                            onClick={() =>
                              removeArrayItem("aboutPage.clients.logos", index)
                            }
                            className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                          >
                            <FaMinus />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-300 mb-1">
                            Name
                          </label>
                          <input
                            {...register(
                              `aboutPage.clients.logos.${index}.name`
                            )}
                            className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white"
                            disabled={isLocked}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-1">
                            Logo URL
                          </label>
                          <div className="flex gap-2">
                            <input
                              {...register(
                                `aboutPage.clients.logos.${index}.logo`
                              )}
                              className="flex-1 px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white"
                              disabled={isLocked}
                            />
                            <label className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded cursor-pointer transition-colors">
                              <FaUpload /> Upload
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleImageUpload(
                                    `aboutPage.clients.logos.${index}.logo`,
                                    e
                                  )
                                }
                                className="hidden"
                                disabled={isLocked}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {!isLocked && (
                    <button
                      type="button"
                      onClick={() =>
                        addArrayItem("aboutPage.clients.logos", {
                          name: "",
                          logo: "",
                        })
                      }
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      <FaPlus /> Add Client
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b border-red-500 pb-2 text-red-400">
              CTA Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  {...register("aboutPage.cta.title")}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  {...register("aboutPage.cta.description")}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white min-h-[100px]"
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Button Text</label>
                <input
                  {...register("aboutPage.cta.button.text")}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Button Link</label>
                <input
                  {...register("aboutPage.cta.button.link")}
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white"
                  disabled={isLocked}
                />
              </div>
            </div>
          </div>

          {!isLocked && (
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-medium transition-colors"
              >
                <FaSave /> Save All Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
