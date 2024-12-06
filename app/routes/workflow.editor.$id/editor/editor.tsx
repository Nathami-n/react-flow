import { workflow } from '@prisma/client'
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from './flow-editor';
import TopBar from './top-bar';



type Props = {
    /**
     * the workflow that is received from the root route page where the id is given
     @type {workflow}
     */
    workflow: workflow
}

/**
 * an Editor wrapper component that wraps the actual react-flow editor and the normal react content with a react flow provider
 * @param {Props} props - the propers received from the root route page
 * @returns {JSX.Element}
 */

export default function Editor({ workflow }: Props): JSX.Element {
    return (
        <ReactFlowProvider>
            <div className='flex flex-col h-full w-full overflow-hidden'>
                <TopBar title='Workflow editor' subtitle={workflow.name} />
                <section className='flex h-full overflow-auto'>
                    <FlowEditor workflow={workflow} />
                </section>
            </div>
        </ReactFlowProvider>
    )
}


