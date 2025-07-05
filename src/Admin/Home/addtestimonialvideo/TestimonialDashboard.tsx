import { useState } from "react";
import TestimonialTable from "./TestimonialTable";
import TestimonialForm from "./TestimonialForm";
import type { Testimonial, TestimonialFormData } from "./testimonial";
import initialTestimonials from "../../../configs/all-testimonials";

const TestimonialDashboard = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    initialTestimonials.map((t, i) => ({ ...t, id: `testimonial-${i}` }))
  );
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = (formData: TestimonialFormData) => {
    const newTestimonial = { ...formData, id: `testimonial-${Date.now()}` };
    setTestimonials([newTestimonial, ...testimonials]);
    setShowForm(false);
  };

  const handleUpdate = (id: string, formData: TestimonialFormData) => {
    setTestimonials(
      testimonials.map((t) => (t.id === id ? { ...t, ...formData } : t))
    );
    setEditingTestimonial(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      setEditingTestimonial(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Testimonials</h2>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            Total: {testimonials.length}
          </span>
        </div>
        <button
          onClick={toggleForm}
          className={`px-4 py-2 rounded-md ${
            showForm
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {showForm ? "Cancel" : "Add Testimonial"}
        </button>
      </div>

      {(showForm || editingTestimonial) && (
        <div className="bg-gray-900 p-6 rounded-lg border border-blue-500 mb-8">
          <h3 className="text-lg font-semibold mb-4">
            {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
          </h3>
          <TestimonialForm
            onSubmit={
              editingTestimonial
                ? (data) => handleUpdate(editingTestimonial.id, data)
                : handleCreate
            }
            initialData={editingTestimonial || undefined}
            onCancel={() => {
              setEditingTestimonial(null);
              setShowForm(false);
            }}
          />
        </div>
      )}

      <div className="bg-gray-900 p-6 rounded-lg border border-blue-500">
        <TestimonialTable
          testimonials={testimonials}
          onEdit={(testimonial) => {
            setEditingTestimonial(testimonial);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default TestimonialDashboard;
