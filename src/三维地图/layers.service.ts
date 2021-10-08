import smart3d from 'smart3d';
import LayerManager, { LayerOptions } from '../common/layers';

export class LayerService {
  // _viewer: smart3d.Viewer;
  layerMgt: LayerManager;

  constructor(private viewer: smart3d.Viewer, baseUrl?: string) {
    // this._viewer = viewer;
    this.layerMgt = new LayerManager(viewer, baseUrl);
  }

  addLayers(layers: LayerOptions[]): void {
    layers.forEach((t) => this.layerMgt.add(t));
  }
}
