// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components//ui/button";
// import { Loader2 } from "lucide-react";
// import { Label } from "@/components//ui/label";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/util/constant";
// import { toast } from "sonner";
// import { setUser } from "@/Redux/authSlice";

// const UpdateProfileDailog = ({ open, setOpen }) => {
//   const [loading, setLoading] = useState(false);
//   const { user } = useSelector((store) => store.auth);

//   const [input, setInput] = useState({
//     fullname: user?.fullname,
//     email: user?.email,
//     phoneNumber: user?.phoneNumber,
//     bio: user?.profile?.bio,
//     skills: user?.profile?.skills?.map((skill) => skill),
//     file: user?.profile?.resume,
//     resume: null, // Holds the new resume file
//     profilePhoto: null, // Holds the new profile photo file
//   });

//   const dispatch = useDispatch()

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value })
//   }

//   const fileChangeHandler = async (e) => {
//     const file = e.target.files?.[0];
//     if (e.target.name === "file") {
//       setInput({ ...input, file }); // For resume
//     } if (e.target.name === "profilePhoto") {
//       setInput({ ...input, profilePhoto: file }); // For profile photo
//     }

//    }

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("bio", input.bio);
//     formData.append("skills", input.skills);
//     if (input.resume) {
//       formData.append("resume", input.resume);
//     }
//     if (input.profilePhoto) {
//       formData.append("profilePhoto", input.profilePhoto);
//     }
//     try {
//       setLoading(true);
//       const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         dispatch(setUser(res.data.user));
//         toast.success(res.data.message);
//         setTimeout(() => window.location.reload(), 500); // Force UI to refresh
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);

//       }
//       finally {
//         setLoading(false);
//       }
//       setInput({ ...input, file });
//       console.log(input);
//       setOpen(false);
//       console.log(input);
//   };

//   return (
//     <div className="">
//       <Dialog open={open}>
//         <DialogContent
//           className="sm:max-w-[425px]"
//           onInteractOutside={() => setOpen(false)}
//         >
//           <DialogHeader>
//             <DialogTitle>Update Profile</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={submitHandler}>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="name" className="text-right">
//                   Name
//                 </Label>
//                 <Input
//                   id="name"
//                   name="name"
//                   type="text"
//                   value={input.fullname}
//                   onChange={changeEventHandler}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="email" className="text-right">
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={input.email}
//                   onChange={changeEventHandler}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="number" className="text-right">
//                   Number
//                 </Label>
//                 <Input
//                   id="number"
//                   name="number"
//                   value={input.phoneNumber}
//                   onChange={changeEventHandler}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="bio" className="text-right">
//                   Bio
//                 </Label>
//                 <Input
//                   id="bio"
//                   name="bio"
//                   value={input.bio}
//                   onChange={changeEventHandler}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="skills" className="text-right">
//                   Skills
//                 </Label>
//                 <Input
//                   id="skills"
//                   name="skills"
//                   value={input.skills}
//                   onChange={changeEventHandler}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="file" className="text-right">
//                   Resume
//                 </Label>
//                 <Input
//                   id="file"
//                   name="file"
//                   type="file"
//                   accept="application/pdf"
//                   onChange={fileChangeHandler}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right">Profile Photo</Label>
//               <Input
//                id="profilePhoto"
//                 name="profilePhoto"
//                 type="file"
//                 accept="image/*"
//                 onChange={fileChangeHandler}
//                 className="col-span-3"
//               />
//             </div>

//             </div>
//             <DialogFooter>
//               {loading ? (
//                 <Button className="w-full my-4">
//                   {" "}
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
//                 </Button>
//               ) : (
//                 <Button type="submit" className="w-full my-4">
//                   Update
//                 </Button>
//               )}
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default UpdateProfileDailog;

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/util/constant";
import { toast } from "sonner";
import { setUser } from "@/Redux/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Navbar from "@/components/Shared/Navbar";

const UpdateProfileDailog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    //personal info
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    dateOfBirth: user?.dateOfBirth,
    gender: user?.gender,
    languagesSpoken: user?.languagesSpoken,
    location: user?.location,
    profilePhoto: null, // Holds the new profile photo file

    //personal information
    age: user?.age,
    height: user?.height,
    weight: user?.weight,
    skinTone: user?.skinTone,
    tattoosOrScars: user?.tattoosOrScars,

    //professional Details
    actingExperience: user?.actingExperience,
    skills: user?.profile?.skills?.map((skill) => skill),
    videosOnInternet: user?.videosOnInternet,
    videos: user?.videos,

    //media and Portfolio
    instagramId: user?.instagramId,
    facebookId: user?.facebookId,

    //PreferredRoles
    preferredRoles: user?.preferredRoles,
    bestActingIn: user?.bestActingIn,

    //About me
    bio: user?.profile?.bio,
    //file: user?.profile?.resume,
    //resume: null, // Holds the new resume file
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    // if (e.target.name === "file") {
    //   setInput({ ...input, file: file });      // For resume updated
    // }
    if (e.target.name === "profilePhoto") {
      setInput({ ...input, profilePhoto: file }); // For profile photo
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const requiredFields = ["fullname", "email", "phoneNumber"];
    const missingFields = requiredFields.filter((field) => {
      const keys = field.split(".");
      let value = input;

      keys.forEach((key) => {
        value = value[key];
      });

      return !value; // Check if the field is empty or undefined
    });
    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    const formData = new FormData();

    Object.keys(input).forEach((key) => {
      if (input[key]) {
        if (Array.isArray(input[key])) {
          formData.append(key, input[key].join(",")); // Convert arrays to strings
        } else {
          formData.append(key, input[key]);
        }
      }
    });

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      setInput({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        // dateOfBirth: user?.profile?.dateOfBirth || "",
        dateOfBirth: user.profile.dateOfBirth
          ? new Date(user.profile.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: user?.profile?.gender || "",
        languagesSpoken: user?.profile?.languagesSpoken || "",
        location: user?.profile?.location || "",
        profilePhoto: user?.profile?.profilePhoto || null,
        age: user?.profile?.age || "",
        height: user?.profile?.height || "",
        weight: user?.profile?.weight || "",
        skinTone: user?.profile?.skinTone || "",
        tattoosOrScars: user?.profile?.tattoosOrScars || "",
        actingExperience: user?.profile?.actingExperience || "",
        skills: user?.profile?.skills || [],
        videosOnInternet: user?.profile?.videosOnInternet || "",
        videos: user?.profile?.videos || "",
        instagramId: user?.profile?.instagramId || "",
        facebookId: user?.profile?.facebookId || "",
        preferredRoles: user?.profile?.preferredRoles || "",
        bestActingIn: user?.profile?.bestActingIn || "",
        bio: user?.profile?.bio || "",
        //file: user?.profile?.resume || "",
        //resume: null,
      });
    }
  }, [open, user]);

  return (
    <div className="">
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[1500px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className=" py-4 grid grid-cols-1 md:grid-cols-4 gap-6">
              <h3 className="text-xl font-semibold text-center">
                1. Personal Information
              </h3>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullname" className="text-right">
                  Name
                </Label>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dateofbirth" className="text-right">
                  Date Of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={input.dateOfBirth}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div>
                <Label>Gender</Label>
                <RadioGroup
                  className=" py-4 flex"
                  value={input.gender}
                  onValueChange={(value) =>
                    setInput({ ...input, gender: value })
                  }
                >
                  <div className="space-y-2">
                    <RadioGroupItem value="Male" id="Male" />
                    <Label htmlFor="gender" className="pl-2">
                      Male
                    </Label>
                  </div>
                  <div className="space-y-2 pl-6">
                    <RadioGroupItem value="Female" id="Female" />
                    <Label htmlFor="gender" className="pl-2">
                      Female
                    </Label>
                  </div>
                  <div className="space-y-2 pl-6">
                    <RadioGroupItem value="Other" id="Other" />
                    <Label htmlFor="gender" className="pl-2">
                      Other
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="languagesSpoken" className="text-right">
                  Mother TOUNG
                </Label>
                <Input
                  id="languagesSpoken"
                  name="languagesSpoken"
                  type="text"
                  value={input.languagesSpoken}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Profile Photo</Label>
                <Input
                  id="profilePhoto"
                  name="profilePhoto"
                  type="file"
                  accept="image/*"
                  onChange={fileChangeHandler}
                  className="col-span-3"
                />
              </div>

              {/*Physical Attributes */}
              <h3 className="text-xl font-semibold text-center">
                2. Physical Attributes
              </h3>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="height" className="text-right">
                  Height in feet
                </Label>
                <Input
                  id="height"
                  name="height"
                  type="text"
                  value={input.height}
                  onChange={changeEventHandler}
                  className="col-span-3"
                  placeholder="5'7"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weight" className="text-right">
                  Weight in Kg
                </Label>
                <Input
                  id="weight"
                  name="weight"
                  type="text"
                  value={input.weight}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skinTone" className="text-right">
                  skinTone
                </Label>
                <Input
                  id="skinTone"
                  name="skinTone"
                  type="text"
                  value={input.skinTone}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>tattoosOrScars</Label>
                <RadioGroup
                  className=" py-4 flex"
                  value={input.tattoosOrScars}
                  onValueChange={(value) =>
                    setInput({ ...input, tattoosOrScars: value })
                  }
                >
                  <div className="space-y-2">
                    <RadioGroupItem value="Yes" id="Yes" />
                    <Label htmlFor="tattoosOrScars" className="pl-2">
                      Yes
                    </Label>
                  </div>
                  <div className="space-y-2 pl-6">
                    <RadioGroupItem value="No" id="No" />
                    <Label htmlFor="No" className="pl-2">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  age
                </Label>
                <Input
                  id="age"
                  name="age"
                  type="text"
                  value={input.age}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>

              {/*professional Details */}
              <h3 className="text-xl font-semibold text-center">
                3. Professional Details{" "}
              </h3>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="actingExperience" className="text-right">
                  Acting Experience
                </Label>
                <Input
                  id="actingExperience"
                  name="actingExperience"
                  type="text"
                  value={input.actingExperience}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="videosOnInternet" className="text-right">
                  Videos On Internet
                </Label>
                <Input
                  id="videosOnInternet"
                  name="videosOnInternet"
                  value={input.videosOnInternet}
                  onChange={changeEventHandler}
                  type="text"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="videos" className="text-right">
                  videos
                </Label>
                <Input
                  id="videos"
                  name="videos"
                  value={input.videos}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>

              {/*media and portfolio */}
              <h3 className="text-xl font-semibold text-center">
                4. Media & Portfolio{" "}
              </h3>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="instagramId" className="text-right">
                  instagramId
                </Label>
                <Input
                  id="instagramId"
                  name="instagramId"
                  value={input.instagramId}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="facebookId" className="text-right">
                  facebookId
                </Label>
                <Input
                  id="facebookId"
                  name="facebookId"
                  value={input.facebookId}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>

              {/*PreferredRoles */}
              <h3 className="text-xl font-semibold text-center">
                5. Preferred Roles
              </h3>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bestActingIn" className="text-right">
                  bestActingIn
                </Label>
                <Input
                  id="bestActingIn"
                  name="bestActingIn"
                  value={input.bestActingIn}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="preferredRoles" className="text-right">
                  PreferredRoles
                </Label>
                <Input
                  id="preferredRoles"
                  name="preferredRoles"
                  value={input.preferredRoles}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              {/*About me */}
              <h3 className="text-xl font-semibold text-center">6. About me</h3>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="col-span-3"
                />
              </div> */}
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDailog;
