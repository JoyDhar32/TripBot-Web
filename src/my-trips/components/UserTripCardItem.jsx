import React from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserTripCardItem = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };
  return (
    <Link to={`/view-trip/${trip?.id}`}>
    <div className="hover:scale-105 transition-all cursor-pointer">
      <img
        src={photoUrl ? photoUrl : "/placeholder.jpeg"}
        alt="trip"
        className="rounded-xl h-[220px] w-full object-cover"
      />
      <div>
        <h2 className="font-bold text-lg">
          {trip?.userSelection?.location?.label}
        </h2>
        <p className="text-gray-500">
          {trip?.userSelection?.noOfDays} Days trip with{" "}
          {trip?.userSelection?.budget}
        </p>
      </div>
    </div>
    </Link>
  );
};

export default UserTripCardItem;