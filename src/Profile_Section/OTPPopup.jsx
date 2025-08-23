import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { KeyRound, Save, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function OTPPopup(state) 
{

const [otp, setOtp] = useState(Array(6).fill(""));
const [otpInt,setOtpInt]=useState(0);
const inputRefs = useRef([]);

const handleChange = (val, idx) => 
{

  if (!/^\d?$/.test(val)) return; // Allow only single digit

  // Main Logic : 

  // Array Of char (otp [length 6]) 

  // -> converted to string (otp.join("")-> "112211" String) return String 

  // -> Then Parse [Str-Int] using (parseInt(newOtp.join(""), 10)) returrn int value

  // -> Concept :

  /* 
  Why join("")?
      Array.join(separator) combines all array elements into one string.
      The "separator" is what gets placed between each element.

      ["1", "2", "3"].join("")   // "123"  → no separator
      ["1", "2", "3"].join("-")  // "1-2-3" → dash as separator
      ["1", "2", "3"].join(" ")  // "1 2 3" → space as separator
    👉 We use "" (empty string) because we want the digits stuck together as "123456".
  */

  /*
  What is the 10 in parseInt("12212", 10)?

    That’s the radix (base). It tells JavaScript what number system the string is in.
      10 → decimal (normal numbers we use)
      2 → binary
      8 → octal
      16 → hexadecimal

      parseInt("101", 2)   // 5   (binary 101 = decimal 5)
      parseInt("A", 16)    // 10  (hex A = decimal 10)
      parseInt("12212", 10) // 12212 (normal decimal number)

      👉 So 10 means "treat the string as a normal decimal number".
  */
  const newOtp = otp.map((d, i) => (i === idx ? val : d));
  setOtpInt(parseInt(newOtp.join(""),10));;
  setOtp(newOtp);

  // Move next if not last and value entered
  if (val && idx < otp.length - 1) inputRefs.current[idx + 1].focus();

  // If all digits filled → final OTP
  // if (newOtp.every(Boolean)) 
  // {
  //   handleSave();
  // }
    
};

const handleKey = (e, idx) => 
{
  if (e.key === "Backspace" && !otp[idx] && idx > 0) {
    inputRefs.current[idx - 1].focus();
  }
};

const handleSave=()=>
{
  
  if (otpInt===state.orignalOtp) 
  {
      state.OtpValidator();
  }
  else
  {
     toast('Wrong OTP.', {
              icon: 'ℹ️',
              duration: 3000,
              style: {
                border: '1px solid gray', // blue border
                padding: '12px',
                color: 'white',
              }
            });
  }
}

  return (
    <div
      className="fixed inset-0 bg-gray-900/20 flex p-5 items-center justify-center z-50"
      style={{ backdropFilter: "blur(2px)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-950 border border-[#1f1f1f] rounded-2xl px-6 py-6 w-full max-w-md shadow-2xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <KeyRound className="w-7 h-7 text-blue-200" />
            <h3 className="text-lg font-semibold text-white">Enter OTP</h3>
          </div>
        </div>

        {/* OTP Input in Blocks */}
        <div className="flex justify-center gap-3 mb-4">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-12 h-12 text-center text-lg rounded-lg bg-gray-900 text-white outline-none border border-gray-700 focus:border-blue-500"
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
          >
            <Send className="w-4 h-4" />
            Submit
          </button>
        </div>
         
      </motion.div>
    </div>
  );
}
