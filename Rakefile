require 'rubygems'
require 'bundler'
require 'rubocop/rake_task'
require 'cucumber'
require 'cucumber/rake/task'

namespace :quality do
  desc 'Run RuboCop on the lib directory'
  RuboCop::RakeTask.new(:rubocop) do |task|
    task.fail_on_error = true
    task.options = ['-D', '-c./.rubocop.yml']
  end
end

Cucumber::Rake::Task.new(:test, 'TEST') do |t|
  t.cucumber_opts = '--format pretty -t ~@wip'
end

task default: ['Cucumber:test']
