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

RSpec.describe Primer::OpenProject::Forms::Dsl::InputMethods, type: :forms do
  let(:form_object) { Primer::Forms::Dsl::FormObject.extend(described_class) }
  let(:builder) { instance_double(ActionView::Helpers::FormBuilder, object: model) }
  let(:form) { instance_double(ApplicationForm, model:, caption_template?: false) }
  let(:instance) { form_object.new(builder:, form:) }

  let(:model) { build_stubbed(:project) }

  before do
    allow(form).to receive(:wrap_attribute_label_with_help_text)
      .with(label, name)
      .and_return "wrapped #{label}"
  end

  let(:name) { :subject }
  let(:label) { "Subject" }

  shared_examples_for "input class" do |input_class|
    it "instantiates correct input class" do
      expect(field).to be_a(input_class)
    end
  end

  shared_examples_for "label wrapping" do
    it "wraps the label" do
      expect(field).to have_attributes(name:, label: "wrapped #{label}")
    end
  end

  describe "#separator" do
    subject(:field) { instance.separator.first }

    include_examples "input class", Primer::Forms::Separator
  end

  describe "text input methods" do
    describe "#text_field" do
      subject(:field) { instance.text_field(name:, label:).first }

      include_examples "input class", Primer::Forms::Dsl::TextFieldInput
      include_examples "label wrapping"
    end

    describe "#auto_complete" do
      subject(:field) { instance.auto_complete(name:, label:).first }

      include_examples "input class", Primer::Forms::Dsl::AutoCompleteInput
      include_examples "label wrapping"
    end

    describe "#text_area" do
      subject(:field) { instance.text_area(name:, label:).first }

      include_examples "input class", Primer::Forms::Dsl::TextAreaInput
      include_examples "label wrapping"
    end
  end

  describe "select input methods" do
    describe "#select_list" do
      subject(:field) { instance.select_list(name:, label:).first }

      include_examples "input class", Primer::Forms::Dsl::SelectInput
      include_examples "label wrapping"
    end

    describe "#action_menu" do
      subject(:field) { instance.action_menu(name:, label:).first }

      include_examples "input class", Primer::Forms::Dsl::ActionMenuInput
      include_examples "label wrapping"
    end
  end

  describe "button input methods" do
    describe "#submit" do
      subject(:field) { instance.submit(name:, label:).first }

      include_examples "input class", Primer::Forms::Dsl::SubmitButtonInput
      include_examples "label wrapping"
    end

    describe "#button" do
      subject(:field) { instance.button(name:, label:).first }

      include_examples "input class", Primer::Forms::Dsl::ButtonInput
      include_examples "label wrapping"
    end
  end
end
