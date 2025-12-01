import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.models.js"
// import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = AsyncHandler(async (req,res) => {
    //get user details from frontend
    //validation - not empty
    //check if user already exists: username,email
    //check for images 
    //check for avatar
    //upload them to cloudinary,avatar
    //create user object - create entry in db
    //remove password and refresh token fiels fro response
    //check for user creation
    //return response

   const {lastname,firstname,phoneno,password} = req.body

   
//    console.log("password",password)
//    console.log("fullname",fullname)
//    console.log("username",username)

// if(fullname===""){
//     throw new ApiError(400,"fullname is required")
// }
// console.log("req.body ",req.body)
if(!firstname?.trim() || !lastname?.trim() || !password?.trim() || !phoneno) {
       throw new ApiError(400, "all fields are required")
   }

const existedUser =await User.findOne({
    $or: [{phoneno}]
})

if(existedUser){
    throw new ApiError(409,"user is already registered")
}

// const avatarLocalPath = req.files?.avatar[0]?.path;
// const coverImageLocalPath = req.files?.coverImage[0]?.path;

// console.log("file : ",req.files)

// if(!avatarLocalPath){
//     throw new ApiError(400," Avatar file is required")
// }

// const avatar = await uploadOnCloudinary(avatarLocalPath)
// const coverImage = await uploadOnCloudinary(coverImageLocalPath)

// if(!avatar){
//     throw new ApiError(400,"avatar file is required")
// }

const user = await User.create({
    firstname,
    lastname,
    // avatar: avatar.url,
    // coverImage: coverImage?.url || "",
    phoneno,
    password,
    // username: username.toLowerCase()
})

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createdUser){
    throw new ApiError(500,"something went wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registered Successfully")
)
 


})

const loginUser = AsyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {phoneno,password} = req.body
console.log(phoneno)
    if (!phoneno) {
        throw new ApiError(400, "phoneno is required")
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
        
    // }

    const user = await User.findOne({
        $or: [{phoneno}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")

    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!user || !isPasswordValid) {
    return res.status(400).json({message:"Invalid phone number or password!!"});
    
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

export {registerUser}
export {loginUser}