//-- copyright
// OpenProject is an open source project management software.
// Copyright (C) the OpenProject GmbH
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See COPYRIGHT and LICENSE files for more details.
//++
/* eslint-disable max-classes-per-file */

import '@openproject/primer-view-components/app/components/primer/alpha/tool_tip';

type Direction = 'n' | 's' | 'e' | 'w' | 'ne' | 'se' | 'nw' | 'sw';
declare class ToolTipElement extends HTMLElement {
    #private;
    styles():string;
    get showReason():'focus' | 'mouse';
    get htmlFor():string;
    set htmlFor(value:string);
    get type():'description' | 'label';
    set type(value:'description' | 'label');
    get direction():Direction;
    set direction(value:Direction);
    get control():HTMLElement | null;
    set hiddenFromView(value:true | false);
    get hiddenFromView():true | false;
    connectedCallback():void;
    disconnectedCallback():void;
    handleEvent(event:Event):Promise<void>;
    static observedAttributes:string[];
    attributeChangedCallback(name:string):void;
}
export class NgCompatToolTipElement extends ToolTipElement {
  static observedAttributes:string[] = [...super.observedAttributes, 'for'];

  connectedCallback():void {
    super.connectedCallback();
  }

  attributeChangedCallback(name:string) {
    if (!this.isConnected) return;

    if (name === 'for') {
      this.connectedCallback();
    }
    super.attributeChangedCallback(name);
  }
}
declare global {
    interface Window {
        NgCompatToolTipElement:typeof NgCompatToolTipElement;
    }
}
