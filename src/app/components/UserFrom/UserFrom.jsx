// components/UserFrom/UserFrom.js
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

const skillsOptions = [
  // Development Skills
  { value: "html", label: "HTML", category: "Development" },
  { value: "css", label: "CSS", category: "Development" },
  { value: "bootstrap", label: "Bootstrap", category: "Development" },
  { value: "wordpress", label: "WordPress", category: "Development" },
  { value: "shopify", label: "Shopify", category: "Development" },
  { value: "javascript", label: "JavaScript", category: "Development" },
  { value: "restful-apis", label: "Rest APIs", category: "Development" },
  { value: "apis", label: "APIs", category: "Development" },
  { value: "react", label: "React", category: "Development" },
  { value: "node", label: "Node.js", category: "Development" },
  { value: "nextjs", label: "Next.js", category: "Development" },
  { value: "python", label: "Python", category: "Development" },
  { value: "java", label: "Java", category: "Development" },
  { value: "swift", label: "Swift", category: "Development" },
  { value: "react native", label: "React Native", category: "Development" },

  // Designing Skills
  { value: "photoshop", label: "Adobe Photoshop", category: "Designing" },
  { value: "illustrator", label: "Adobe Illustrator", category: "Designing" },
  { value: "figma", label: "Figma", category: "Designing" },
  { value: "xd", label: "Adobe XD", category: "Designing" },
  { value: "sketch", label: "Sketch", category: "Designing" },

  // Marketing Skills
  { value: "seo", label: "SEO", category: "Marketing" },
  { value: "sem", label: "SEM", category: "Marketing" },
  { value: "content-marketing", label: "Content Marketing", category: "Marketing" },
  { value: "social-media", label: "Social Media Marketing", category: "Marketing" },
  { value: "email-marketing", label: "Email Marketing", category: "Marketing" },

  // Content Writing Skills
  { value: "copywriting", label: "Copywriting", category: "Content Writing" },
  { value: "blog-writing", label: "Blog Writing", category: "Content Writing" },
  { value: "technical-writing", label: "Technical Writing", category: "Content Writing" },
  { value: "creative-writing", label: "Creative Writing", category: "Content Writing" },
  { value: "editing", label: "Editing & Proofreading", category: "Content Writing" },

  // Android Developer Skills
  { value: "kotlin", label: "Kotlin", category: "Android Development" },
  { value: "java-android", label: "Java for Android", category: "Android Development" },
  { value: "flutter", label: "Flutter", category: "Android Development" },
  { value: "android-studio", label: "Android Studio", category: "Android Development" },
  { value: "xml", label: "XML (Android Layouts)", category: "Android Development" },

  // Human Resources Skills
  { value: "human-resources", label: "Human Resources", category: "Human Resources" },
  { value: "team-management", label: "Team Management", category: "Human Resources" },
  
  // Freelancing Skills
  { value: "upwork-bidder", label: "Upwork Bidder", category: "Freelancing" },

  // Leadership Skills
  { value: "technical-team-lead", label: "Technical Team Lead", category: "Leadership" },
  { value: "project-manager", label: "Project Manager", category: "Leadership" },
  { value: "ceo", label: "CEO", category: "Leadership" },
];


const UserFrom = ({ onSubmitForm }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    onSubmitForm(data); // Call the parent function with form data
    reset(); // Reset the form after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Enter Your Name"
        />
        {errors.name && <p className="error-msg">{errors.name.message}</p>}
      </div>

      <div className="form-group">
        <input
          {...register("position", { required: "Position is required" })}
          placeholder="Enter position"
        />
        {errors.position && <p className="error-msg">{errors.position.message}</p>}
      </div>

      <div className="form-group">
        <input
          type="number"
          {...register("experience", {
            required: "Experience is required",
            min: { value: 0, message: "Experience must be positive" },
          })}
          placeholder="Enter experience in years"
        />
        {errors.experience && <p className="error-msg">{errors.experience.message}</p>}
      </div>

      <div className="form-group">
        <Controller
          name="skills"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              isMulti
              placeholder="Please select your skills"
              options={skillsOptions}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          )}
          rules={{ required: "Please select at least one skill" }}
        />
        {errors.skills && <p className="error-msg btnm">{errors.skills.message}</p>}
      </div>

      <button className="btn" type="submit">Submit</button>
    </form>
  );
};

export default UserFrom;
