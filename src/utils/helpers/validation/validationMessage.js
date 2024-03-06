export const validationMessage = {
  email: {
    emptyError: "Please enter your email id",
    validationError: "Enter a valid email id",
  },
  confirmEmail: {
    emptyError: "Please enter your confirm email id",
    validationError: "Enter a valid confirm email id",
  },
  aadhaarNumber: {
    emptyError: "Please enter your Aadhaar number",
    validationError: "Please enter your 12 digit Aadhaar Number",
  },
  password: {
    emptyError: "Password cannot be empty",
    BlankSpaceError: "Blank space & special characters are not allowed",
    validationError: "Password should be equal or greater than five digits",
    conformationError: "Password should be same",
    maxError: "Password cannot be more than 15 characters",
    alphaNumericError: "Password cannot have special characters",
  },
  name: {
    emptyError: "Name cannot be empty",
    validationError: "Enter your name",
    minError: "Name should be greater than 3 characters",
    maxError: "Name should be less than 15 characters",
    specialCharactersError: "Special characters are not allowed",
    alphaError: "Name should contain only alphabets",
    blankSpaceError: "Blank space are not allowed",
  },
  userName: {
    emptyError: "Username cannot be empty",
    validationError: "Enter your Username",
    minError: "Username should be greater than 3 characters",
    maxError: "Username should be less than 15 characters",
    specialCharactersError: "Special characters are not allowed",
    whiteSpaceError: "White space is not allowed",
  },
  Bio: {
    maxError: "Bio maximum characters limit reached",
  },
  searchName: {
    emptyError: "Enter mininum 4 characters of rival name",
    validationError: "Enter mininum 4 characters of rival name",
  },
  bankUserName: {
    emptyError: "Name cannot be empty",
    validationError: "Enter your name",
  },
  mobile: {
    emptyError: "Please enter phone number to proceed",
    validationError: "Please enter valid 10 digit phone number.",
  },
  otp: {
    emptyError: "OTP cannot be empty",
    validationError: "Please enter a valid OTP number",
    maxError: "OTP should be 4 digits",
    coolDownPeriod:
      "Maximum OTP request limit reached. Please wait for some time",
  },
  aadhaarOtp: {
    emptyError: "OTP cannot be empty",
    validationError: "Please enter a valid OTP number",
    maxError: "OTP should be 6 digits",
  },
  teamName: {
    emptyError: "Username cannot be empty",
    validationError: "Username should be greater than 3 characters",
    maxError: "Username cannot be more than 15 characters",
    BlankSpaceError: "Blank space are not allowed",
    alphaNumericError: "Username cannot have special characters",
  },
  referral: {
    emptyError: "referral cannot be empty",
    validationError: "referral should be greater than 3 characters",
    maxError: "referral cannot be more than 15 characters",
    BlankSpaceError: "Blank space are not allowed",
    alphaNumericError: "referral cannot have special characters",
  },
  dob: {
    emptyError: "Please provide date of birth",
    validationError: "Please enter valid date of birth",
  },
  date: {
    emptyError: "Please provide date",
    validationError: "Please enter valid date",
  },
  month: {
    emptyError: "Please provide month",
    validationError: "Please enter valid month",
  },
  year: {
    emptyError: "Please provide year",
    validationError: "Please enter valid year",
  },
  leagueName: {
    emptyError: "League name cannot be empty",
    validationError: "League name cannot have special characters",
    minError: "League name should be greater than 3 characters",
    maxError: "League name cannot be more than 15 characters",
    BlankSpaceError: "Blank space are not allowed",
  },
  winningAmount: {
    emptyError: "Winning amount cannot be empty",
    validationError: "Winning amount should be valid",
    maxError: "Winning Amount should be less than ₹ 10000",
    decimalError: "Entry fee should be whole numbers",
  },
  entryFee: {
    emptyError: "Entry fee cannot be empty",
    validationError: "Entry fee should be valid",
    maxError: "Entry fee should be less than ₹ 6000",
  },
  entryFeePrivateLeague: {
    emptyError: "Entry fee cannot be empty",
    validationError: "Entry fee should be valid",
    decimalError: "Entry fee should be whole numbers",
    maxError: "Entry fee should be less than ₹ 5750",
    minError: "Entry fee should be greater than ₹ 5",
  },
  noOfTeams: {
    emptyError: "Please enter a no.of teams",
    validationError: "No of teams should be from 2-100",
    decimalError: "Entry fee should be whole numbers",
    winnerError: "Entries should be greater than 6 for multiple winners",
    maxWinError: "Cannot create multiple winners league",
    noOfTeamsError: "No of teams should be lesser",
    minimumEntriesError: "No of teams should be greater than minimum entries",
    minimumEntriesSingleError: "No of teams should be greater than 2 ",
  },
  noOfSquads: {
    emptyError: "Please enter a no.of squads",
    validationError: "No of squads should be from 2-100",
  },
  addMoney: {
    emptyError: "Enter amount to be added in ₹",
    validationError: "Enter valid amount in ₹",
    minError: "Minimum amount is ₹ 25",
    maxError: "Must be lesser than ₹ 99999",
  },
  panName: {
    emptyError: "PAN Name cannot be empty",
    validationError: "Enter valid name as per mentioned on PAN card",
  },
  panNumber: {
    emptyError: "PAN Card number cannot be empty",
    validationError: "Enter valid 10 digit PAN card number",
  },
  bankNumber: {
    emptyError: "Bank Number cannot be empty",
    validationError: "Enter valid bank number",
  },
  reenterbankNumber: {
    emptyError: "Bank Number cannot be empty",
    validationError: "Enter valid bank number",
  },
  accountName: {
    emptyError: "Bank account holder name cannot be empty",
    validationError: "Enter valid bank account holder name",
  },
  ifscCode: {
    emptyError: "IFSC code cannot be empty",
    validationError: "Enter valid 11 digit IFSC code",
  },
  address: {
    emptyError: "Address cannot be empty",
    validationError: "Enter a valid address",
  },
  state: {
    emptyError: "Please select your state",
    validationError: "Enter a valid state",
  },
  city: {
    emptyError: "City cannot be empty",
    validationError: "Enter a valid city",
  },
  Pincode: {
    emptyError: "Pincode code cannot be empty",
    validationError: "Enter valid 6 digit Pincode code",
  },
  contactName: {
    emptyError: "Contact person name cannot be empty",
    validationError: "Enter Contact person name",
  },
  withdrawAmount: {
    emptyError: "Enter amount to be withdrawn in ₹",
    validationError: "Enter valid amount in ₹100-₹9999",
    minError: "Minimum amount is ₹ 100",
    maxError: "Must be lesser than ₹ 10000",
  },
  withdrawAmountNewUser: {
    emptyError: "Enter amount to be withdrawn in ₹",
    validationError: "Enter valid amount in ₹100-₹9999",
    minError: "Minimum amount is ₹ 100",
    maxError: "Must be lesser than ₹ 10000",
  },
  bloggerContestName: {
    emptyError: "League Name cannot be empty",
    validationError: "League Name should be less than 20 characters",
  },
  league_Code: {
    emptyError: "League Code cannot be empty",
    validationError: "League Code should be greater than 4 characters",
  },
  bloggerContestDesc: {
    emptyError: "League Description cannot be empty",
    validationError: "League Description should be less than 30 characters",
  },
  autoScaleEntryFee: {
    emptyError: "Entry Fee should be from 2-1000",
    validationError: "Entry Fee should be from 2-1000",
    minError: "Minimum amount is ₹ 300",
    maxError: "Must be lesser than ₹ 10000",
  },
  message: {
    emptyError: "Please enter a message",
  },
  bankAccounctNumber: {
    emptyError: "Bank account number cannot be empty",
    validationError: "Enter a valid account number",
  },
  confirmBankAccountNumber: {
    emptyError: "Enter your bank account number",
    validationError: "Account number do not match.",
  },
};
