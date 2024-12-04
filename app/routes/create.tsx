import { Form } from "@remix-run/react";

const CreateFlow = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Create Your First Workflow</h1>
            <Form
                method="post"
                action="/api/nodes"
                className="w-full max-w-md p-4 border rounded-md shadow-md"
            >
                <div className="mb-4">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Node Type
                    </label>
                    <input
                        type="text"
                        name="type"
                        id="type"
                        placeholder="Enter node type"
                        className="mt-1 p-2 border rounded-md w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="label" className="block text-sm font-medium text-gray-700">
                        Node Label
                    </label>
                    <input
                        type="text"
                        name="label"
                        id="label"
                        placeholder="Enter node label"
                        className="mt-1 p-2 border rounded-md w-full"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Create Workflow
                </button>
            </Form>
        </div>
    );
};

export default CreateFlow;
