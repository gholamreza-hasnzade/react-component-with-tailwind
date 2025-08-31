import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TimePicker } from "./timePicker";

// Validation schema with Yup
const timeValidationSchema = yup.object({
  meetingTime: yup
    .string()
    .required("Meeting time is required")
    .matches(
      /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Please enter a valid 24-hour time (HH:MM)"
    ),
  appointmentTime: yup
    .string()
    .required("Appointment time is required")
    .matches(
      /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i,
      "Please enter a valid 12-hour time (HH:MM AM/PM)"
    ),
  businessTime: yup
    .string()
    .required("Business time is required")
    .test("business-hours", "Business hours are 9 AM - 5 PM", function (value) {
      if (!value) return false;
      const time = value.replace(/\s?(AM|PM)/i, "");
      const [hours, minutes] = time.split(":").map(Number);
      const totalMinutes = hours * 60 + minutes;
      return totalMinutes >= 9 * 60 && totalMinutes <= 17 * 60;
    }),
  preciseTime: yup
    .string()
    .required("Precise time is required")
    .matches(
      /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
      "Please enter a valid time with seconds (HH:MM:SS)"
    ),
  startTime: yup.string().required("Start time is required"),
  endTime: yup
    .string()
    .required("End time is required")
    .test(
      "end-after-start",
      "End time must be after start time",
      function (value) {
        const { startTime } = this.parent;
        if (!startTime || !value) return true;

        const start = startTime.replace(/\s?(AM|PM)/i, "");
        const end = value.replace(/\s?(AM|PM)/i, "");
        const [startHours, startMinutes] = start.split(":").map(Number);
        const [endHours, endMinutes] = end.split(":").map(Number);

        const startTotal = startHours * 60 + startMinutes;
        const endTotal = endHours * 60 + endMinutes;

        return endTotal > startTotal;
      }
    ),
});

type TimeFormData = yup.InferType<typeof timeValidationSchema>;

export const TimePickerValidationExample = () => {
  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    watch,
  } = useForm<TimeFormData>({
    resolver: yupResolver(timeValidationSchema),
    mode: "onChange",
    defaultValues: {},
  });

  const watchedStartTime = watch("startTime");

  const onSubmit = (data: TimeFormData) => {
    console.log("Form submitted with data:", data);
  };

  const onReset = () => {
    reset({});
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Time Picker with React Hook Form + Yup Validation
        </h1>

        {/* React Hook Form Validation */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Form Validation Example
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 24-hour format with validation */}
              <div>
                <Controller
                  name="meetingTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      value=""
                      label="Meeting Time (24h)"
                      placeholder="Enter time (HH:MM)"
                      format="24h"
                      error={errors.meetingTime?.message}
                      helperText="Enter time in 24-hour format (e.g., 14:30)"
                    />
                  )}
                />
              </div>

              {/* 12-hour format with validation */}
              <div>
                <Controller
                  name="appointmentTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      value=""
                      label="Appointment Time (12h)"
                      placeholder="Enter time (HH:MM AM/PM)"
                      format="12h"
                      error={errors.appointmentTime?.message}
                      helperText="Enter time in 12-hour format (e.g., 2:30 PM)"
                    />
                  )}
                />
              </div>

              {/* Business hours validation */}
              <div>
                <Controller
                  name="businessTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      value=""
                      label="Business Hours (9 AM - 5 PM)"
                      placeholder="Enter business hours"
                      format="12h"
                      minTime="09:00"
                      maxTime="17:00"
                      error={errors.businessTime?.message}
                      helperText="Only business hours are allowed"
                    />
                  )}
                />
              </div>

              {/* Precise time with seconds */}
              <div>
                <Controller
                  name="preciseTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      value=""
                      label="Precise Time (with seconds)"
                      placeholder="Enter time (HH:MM:SS)"
                      format="24h"
                      showSeconds={true}
                      error={errors.preciseTime?.message}
                      helperText="Enter time with seconds precision"
                    />
                  )}
                />
              </div>

              {/* Start and End time with cross-field validation */}
              <div>
                <Controller
                  name="startTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      value=""
                      label="Start Time"
                      placeholder="Enter start time"
                      format="12h"
                      error={errors.startTime?.message}
                      helperText="When does your day begin?"
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name="endTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      value=""
                      label="End Time"
                      placeholder="Enter end time"
                      format="12h"
                      error={errors.endTime?.message}
                      helperText={`Must be after ${
                        watchedStartTime || "start time"
                      }`}
                    />
                  )}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
/*                 disabled={!isValid || isSubmitting}
 */                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Submitting..." : "Submit Form"}
              </button>

              <button
                type="button"
                onClick={onReset}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Reset Form
              </button>
            </div>

            {/* Form Status */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Form Status:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p>
                    <span className="font-medium">Form Valid:</span>{" "}
                    {isValid ? "✅ Yes" : "❌ No"}
                  </p>
                  <p>
                    <span className="font-medium">Has Errors:</span>{" "}
                    {Object.keys(errors).length > 0 ? "❌ Yes" : "✅ No"}
                  </p>
                  <p>
                    <span className="font-medium">Error Count:</span>{" "}
                    {Object.keys(errors).length}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium">Start Time:</span>{" "}
                    {watchedStartTime || "Not set"}
                  </p>
                  <p>
                    <span className="font-medium">End Time:</span>{" "}
                    {watch("endTime") || "Not set"}
                  </p>
                </div>
              </div>
            </div>

            {/* Current Form Values */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Current Form Values:
              </h3>
              <pre className="text-xs text-blue-700 bg-blue-100 p-3 rounded overflow-auto">
                {JSON.stringify(watch(), null, 2)}
              </pre>
            </div>
          </form>
        </div>

        {/* Validation Rules Explanation */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Validation Rules Explained
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Field Validations:
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <strong>Meeting Time:</strong> Required, 24h format (HH:MM)
                </li>
                <li>
                  <strong>Appointment Time:</strong> Required, 12h format (HH:MM
                  AM/PM)
                </li>
                <li>
                  <strong>Business Time:</strong> Required, must be 9 AM - 5 PM
                </li>
                <li>
                  <strong>Precise Time:</strong> Required, with seconds
                  (HH:MM:SS)
                </li>
                <li>
                  <strong>Start Time:</strong> Required
                </li>
                <li>
                  <strong>End Time:</strong> Required, must be after start time
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Custom Validation:
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <strong>Business Hours:</strong> Custom test for 9 AM - 5 PM
                  range
                </li>
                <li>
                  <strong>Cross-field:</strong> End time must be after start
                  time
                </li>
                <li>
                  <strong>Format Matching:</strong> Regex patterns for time
                  formats
                </li>
                <li>
                  <strong>Real-time:</strong> Validation on change with error
                  display
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Installation & Setup
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Install Dependencies:
              </h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                {`npm install react-hook-form @hookform/resolvers yup`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Import Statements:
              </h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                {`import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Key Features:
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Real-time validation with error messages</li>
                <li>• Cross-field validation (end time after start time)</li>
                <li>• Custom validation rules (business hours)</li>
                <li>• Form state management and submission</li>
                <li>• Default values and form reset</li>
                <li>• Integration with your existing TimePicker component</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
