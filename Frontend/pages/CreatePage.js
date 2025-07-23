class ProductosPage {
  constructor(page) {
    this.page = page
    this.selectors = {
      btnCrearArticulo: 'selector-para-boton-crear-articulo',
      inputCodigoSKU: 'selector-para-input-codigo-sku',
      inputDescripcion: 'selector-para-input-descripcion',
      inputStockActual: 'selector-para-input-stock',
      inputCosto: 'selector-para-input-costo',
      inputPrecioVenta: 'selector-para-input-precio-venta',
      inputUnidadMedida: 'selector-para-input-unidad-medi',
      btnGuardarCambios: 'selector-para-boton-guard',
      mensajeExito: 'selector-para-mensaje-exito',
      mensajeError: 'selector-para-mensaje-err',
      listaProductos: 'selector-para-lista-productos',
    }
  }

  async clickCrearArticulo() {
    await this.page.click(this.btnCrearArticulo)
  }

  async completarFormulario(campos) {
    if (campos['Código SKU']) {
      await this.page.fill(this.inputCodigoSKU, campos['Código SKU'])
    }
    if (campos['Descripción']) {
      await this.page.fill(this.inputDescripcion, campos['Descripción'])
    }
    if (campos['Stock actual']) {
      await this.page.fill(
        this.inputStockActual,
        campos['Stock actual'].toString()
      )
    }
    if (campos['Costo']) {
      await this.page.fill(this.inputCosto, campos['Costo'].toString())
    }
    if (campos['Precio de venta']) {
      await this.page.fill(
        this.inputPrecioVenta,
        campos['Precio de venta'].toString()
      )
    }
    if (campos['Unidad de medida']) {
      await this.page.fill(this.inputUnidadMedida, campos['Unidad de medida'])
    }
  }

  async guardarCambios() {
    await this.page.click(this.btnGuardarCambios)
  }

  async obtenerMensajeExito() {
    return this.page.textContent(this.mensajeExito)
  }

  async obtenerMensajeError() {
    return this.page.textContent(this.mensajeError)
  }

  async productoExiste(nombre) {
    const texto = await this.page.textContent(this.listaProductos)
    return texto.includes(nombre)
  }
}

module.exports = { ProductosPage }
