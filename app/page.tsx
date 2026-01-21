import { FaGithub } from "react-icons/fa";
import { SiPostman } from "react-icons/si";

export default function Home() {

  return (
    <div className="max-w-3xl m-auto p-6 flex flex-col justify-center h-screen text-gray-800 bg-[#EEEEEE] font-mono">
      <h1 className="text-3xl text-center font-bold mb-4 bg-amber-100 px-8 py-4 rounded-4xl text-amber-500">🥘 Best Tapas Valencia - API</h1>
      <p className="mb-4">
        This API allows you to manage tapas, bars, along with their categories, tags and areas. Protected endpoints require a valid JWT token.
        You can explore and test all endpoints using the Postman collection.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Quick Links</h2>
      <ul className="list-disc list-inside space-y-1 mb-6">
        <li className="flex items-center gap-2">
          <FaGithub size={24} />
          <a
            href="https://github.com/camelia96/best-tapas-valencia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold"
          >
            GitHub Repository
          </a>
        </li>
        <li className="flex items-center gap-2">
          <SiPostman size={24} />
          <a
            href="https://web.postman.co/workspace/cf02a57e-03fe-4ce4-993b-f766b6619562/collection/27364724-957ab696-91a6-448d-ba68-ddcbe81f2d7f?action=share&source=copy-link&creator=27364724"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            <span className="font-semibold">Postman Collection</span> (Sign In required)
          </a>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Endpoints Overview</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>
          <strong>/api/auth/login</strong> - Authenticate and receive a JWT token.
        </li>
        <li>
          <strong>/api/tapas</strong> - CRUD operations for tapas.
        </li>
        <li>
          <strong>/api/bars</strong> - CRUD operations for bars.
        </li>
        <li>
          <strong>/api/categories</strong> - CRUD operations for categories.
        </li>
        ...
      </ul>
    </div>
  );
}