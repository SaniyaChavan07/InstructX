import LectureTab from "./LectureTab";

const EditLecture = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-xl">Update Your Lecture</h1>
        </div>
      </div>
      <LectureTab />
    </div>
  );
};

export default EditLecture;
