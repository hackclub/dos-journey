import { Tab } from '@headlessui/react'
import SparkleBackground from '../panels/layout/SparkleBackground'

export default function AchievementsTab() {
  return (
    <SparkleBackground>
      <Tab.Group>
        <Tab.List className="flex p-4">
          <Tab className="w-1/3 py-2 text-center bg-gray-200 rounded-t-lg">Lines of Code</Tab>
          <Tab className="w-1/3 py-2 text-center bg-gray-200">Scrapbook Posts</Tab>
          <Tab className="w-1/3 py-2 text-center bg-gray-200 rounded-t-lg">Shipped Projects</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {/* a grid of divs saying 10, 50, and 100 lines of code */}
            <div className="grid grid-cols-3 gap-4 p-4">
              <div className="bg-white rounded-lg p-4">
                <div className="text-orange-300 font-bold bg-white">10 lines of code</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-hc-green font-bold bg-white">50 lines of code</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-hc-blue font-bold bg-white">100 lines of code</div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            {/* a grid of divs saying 1, 5, and 50 scrapbook posts */}
            <div className="grid grid-cols-3 gap-4 p-4">
              <div className="bg-white rounded-lg p-4">
                <div className="text-orange-300 font-bold bg-white">1 scrapbook post</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-hc-green font-bold bg-white">5 scrapbook posts</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-hc-blue font-bold bg-white">50 scrapbook posts</div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            {/* a grid of divs saying 1, 3, and 7 shipped projects*/}
            <div className="grid grid-cols-3 gap-4 p-4">
              <div className="bg-white rounded-lg p-4">
                <div className="text-orange-300 font-bold bg-white">1 shipped project</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-hc-green font-bold bg-white">3 shipped projects</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-hc-blue font-bold bg-white">7 shipped projects</div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </SparkleBackground>
  )
}
