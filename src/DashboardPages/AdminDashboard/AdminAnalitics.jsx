import useSecureInstance from "../../hooks/SecureInstance";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";
import { Link } from "react-router";
import { Bar, BarChart, Tooltip, XAxis } from "recharts";

const AdminAnalitics = () => {
  const Instance = useSecureInstance();
  const { data: analiticsInfo, isLoading,refetch } = useQuery({
    queryKey: ["analiticsInfo"],
    queryFn: async () => {
      const res = await Instance.get("/scholarship/analitics");
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }
  const data = [...analiticsInfo.applicationPerUniversity];
  console.log(analiticsInfo.applicationPerUniversity);
  return (
    <div>
      <div className="stats bg-base-200 border-base-300 border flex justify-center text-center p-2 space-x-1 gap-3">
        <div className="stat">
          <div className="stat-title">Total Users</div>
          <div className="stat-value">{analiticsInfo.userCount}</div>
          <div className="stat-actions">
            <Link
              to={"/dashboard/mangeUsers"}
              className="btn btn-xs btn-primary"
            >
              Mange User
            </Link>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Scholarship</div>
          <div className="stat-value">{analiticsInfo.scholarShipCount}</div>
          <div className="stat-actions">
            <Link
              to={"/dashboard/addScholarship"}
              className="btn btn-xs btn-primary"
            >
              Add more
            </Link>
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Collected Fees</div>
          <div className="stat-value">
            ${analiticsInfo.collectedFees[0].totalCollectedFees}
          </div>
          <div className="stat-actions">
            <small className="italic text-sm text-gray-400 font-extralight">
              Form {analiticsInfo.collectedFees[0].totalStudentPaid} Students
            </small>
          </div>
        </div>
      </div>
      {/* Bar Charts here */}
      <div className="mt-10 flex justify-center">
        <BarChart
          style={{
            width: "100%",
            maxWidth: "500px",
            maxHeight: "800px",
            aspectRatio: 1.618,
            marginBottom:'200px'
          }}
          responsive
          data={data}
        >
          <XAxis dataKey="_id" angle={-65} interval={0} textAnchor="end" height={200}></XAxis>
          <Bar dataKey="applicationCout" fill="#8884d8" />
          <Tooltip></Tooltip>
        </BarChart>
      </div>
    </div>
  );
};

export default AdminAnalitics;
