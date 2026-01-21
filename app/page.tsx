import { FaGithub } from "react-icons/fa";
import { SiPostman } from "react-icons/si";

export default function Home() {

  return (
    <div className="max-w-4xl m-auto px-6 py-20 flex flex-col justify-center text-gray-800 bg-[#EEEEEE] font-mono gap-4">
      <h1 className="text-3xl text-center font-bold mb-6 bg-amber-100 px-8 py-4 rounded-4xl text-amber-500">🥘 Best Tapas Valencia - API</h1>
      <p className="mb-1">
        This API allows you to manage tapas, bars, along with their categories, tags and areas.
        Protected endpoints require a valid JWT token.
        To explore and test all endpoints you may use the <span className="font-semibold">Postman collection</span>.
      </p>

      {/** Quick Links */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">🔗 Quick Links</h2>
      <ul className="list-disc list-inside space-y-1">
        <li className="flex items-center gap-2">
          <FaGithub size={20} />
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
          <SiPostman size={20} />
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

      {/** Access Policy */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">🔒 Access Policy</h2>
      <p className="text-justify">
        For security reasons, the API is configured with a <span className="font-semibold underline">single test user</span>. The credentials for this user are not exposed publicly, but securely stored inside the Postman collection using collection variables
      </p>
 
      <p className="font-semibold text-justify">Access to protected endpoints is therefore intended to be done via the provided Postman collection.</p>


      {/** Endpoints */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">🧩 Endpoints Overview</h2>
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

      {/** Tech Stack */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">📦 Tech Stack</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Next.js (App Router)</li>
        <li>TypeScript</li>
        <li>Prisma ORM</li>
        <li>PostgreSQL (Supabase)</li>
        <li>JWT (jsonwebtoken)</li>
        <li>Postman for API testing and documentation</li>
      </ul>
    </div>
  );
}