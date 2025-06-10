# frozen_string_literal: true

#-- copyright
# OpenProject is an open source project management software.
# Copyright (C) the OpenProject GmbH
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License version 3.
#
# OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
# Copyright (C) 2006-2013 Jean-Philippe Lang
# Copyright (C) 2010-2013 the ChiliProject Team
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
#
# See COPYRIGHT and LICENSE files for more details.
#++
#
require "spec_helper"

RSpec.describe Primer::OpenProject::Forms::Dsl, type: :forms do
  include ViewComponent::TestHelpers

  class DslTestForm < ApplicationForm
    form do |f|
      f.text_field(name: :first_name, label: "First name")
      f.text_field(name: :last_name, label: "Last name")
    end
  end

  let(:model) { build_stubbed(:project) }

  xit "should foo" do
    builder = Primer::Forms::Builder.new(:project, model, nil, {})
    builder.set_instance_variable(:@controller, vc_test_controller)
    form = DslTestForm.new(builder)
    p form.inputs.size
  end


  xit "should do" do
    form = nil
    render_in_view_context(model) do |model|
      primer_form_with(model: model, url: "/foo") do |f|
        p f
        form = DslTestForm.new(f)
        form.instance_variable_set(:@view_context, self)
      end
    end

    expect(form.inputs.size).to eq 2
    expect(form.inputs[0].inputs[0].label).to eq 2
  end
end
