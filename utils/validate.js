// Validate các trường dữ liệu
export const validateField = (field, value) => {
  switch (field) {
    case "fullName":
      if (value.length < 3) {
        return { isValid: false, error: "Họ tên phải có ít nhất 3 ký tự" };
      }
      if (value.length > 255) {
        return {
          isValid: false,
          error: "Họ tên không được vượt quá 255 ký tự",
        };
      }
      return { isValid: true, error: null };

    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { isValid: false, error: "Email không hợp lệ" };
      }
      return { isValid: true, error: null };

    case "password":
      if (value.length < 8) {
        return { isValid: false, error: "Mật khẩu phải có ít nhất 8 ký tự" };
      }
      if (value.length > 255) {
        return {
          isValid: false,
          error: "Mật khẩu không được vượt quá 255 ký tự",
        };
      }
      return { isValid: true, error: null };

    case "phone":
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value)) {
        return { isValid: false, error: "Số điện thoại phải có đúng 10 số" };
      }
      return { isValid: true, error: null };

    default:
      return { isValid: true, error: null };
  }
};

export const handleFieldChange = (field, value, setters) => {
  const { setErrors, setFullName, setEmail, setPhone, setPassword } = setters;

  switch (field) {
    case "fullName":
      setFullName(value);
      const fullNameValidation = validateField("fullName", value);
      setErrors((prev) => ({ ...prev, fullName: fullNameValidation.error }));
      return fullNameValidation.isValid;

    case "email":
      setEmail(value);
      const emailValidation = validateField("email", value);
      setErrors((prev) => ({ ...prev, email: emailValidation.error }));
      return emailValidation.isValid;

    case "phone":
      const numericValue = value.replace(/[^0-9]/g, "").slice(0, 10);
      setPhone(numericValue);
      const phoneValidation = validateField("phone", numericValue);
      setErrors((prev) => ({ ...prev, phone: phoneValidation.error }));
      return phoneValidation.isValid;

    case "password":
      setPassword(value);
      const passwordValidation = validateField("password", value);
      setErrors((prev) => ({ ...prev, password: passwordValidation.error }));
      return passwordValidation.isValid;

    default:
      return true;
  }
};
