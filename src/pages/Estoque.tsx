
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Search, Plus, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

const estoqueData = [
  {
    id: "1",
    nome: "Shampoo Profissional",
    categoria: "Cuidados",
    quantidade: 25,
    minimo: 10,
    preco: 45.90,
    fornecedor: "Beauty Supplies",
    ultimaCompra: "2025-01-15",
    status: "Normal"
  },
  {
    id: "2",
    nome: "Gel para Cabelo",
    categoria: "Finalização",
    quantidade: 8,
    minimo: 15,
    preco: 28.50,
    fornecedor: "Hair Products Co.",
    ultimaCompra: "2025-01-10",
    status: "Baixo"
  },
  {
    id: "3",
    nome: "Cera Modeladora",
    categoria: "Finalização",
    quantidade: 2,
    minimo: 5,
    preco: 35.00,
    fornecedor: "Style Products",
    ultimaCompra: "2024-12-20",
    status: "Crítico"
  },
  {
    id: "4",
    nome: "Óleo para Barba",
    categoria: "Barba",
    quantidade: 30,
    minimo: 12,
    preco: 52.00,
    fornecedor: "Beard Care Ltd",
    ultimaCompra: "2025-01-18",
    status: "Normal"
  },
  {
    id: "5",
    nome: "Pomada Modeladora",
    categoria: "Finalização",
    quantidade: 18,
    minimo: 8,
    preco: 42.00,
    fornecedor: "Style Products",
    ultimaCompra: "2025-01-12",
    status: "Normal"
  }
];

const Estoque = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEstoque, setFilteredEstoque] = useState(estoqueData);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term === "") {
      setFilteredEstoque(estoqueData);
    } else {
      const filtered = estoqueData.filter(item =>
        item.nome.toLowerCase().includes(term.toLowerCase()) ||
        item.categoria.toLowerCase().includes(term.toLowerCase()) ||
        item.fornecedor.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredEstoque(filtered);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Normal":
        return "bg-green-600";
      case "Baixo":
        return "bg-yellow-600";
      case "Crítico":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Normal":
        return <TrendingUp className="w-4 h-4" />;
      case "Baixo":
        return <TrendingDown className="w-4 h-4" />;
      case "Crítico":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const produtosCriticos = estoqueData.filter(item => item.status === "Crítico").length;
  const produtosBaixos = estoqueData.filter(item => item.status === "Baixo").length;
  const valorTotalEstoque = estoqueData.reduce((total, item) => total + (item.quantidade * item.preco), 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-barbershop-black">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-barbershop-gray-900 border-b border-barbershop-gray-700 flex items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold text-barbershop-gold">Estoque</h1>
              <p className="text-barbershop-gray-300 text-sm">Gerencie produtos e suprimentos</p>
            </div>
            <Button className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
              <Plus className="w-4 h-4 mr-2" />
              Novo Produto
            </Button>
          </header>

          <main className="flex-1 p-6 bg-barbershop-gray-900">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Cards de Estatísticas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Total Produtos</p>
                        <p className="text-2xl font-bold text-barbershop-gold">{estoqueData.length}</p>
                      </div>
                      <Package className="w-8 h-8 text-barbershop-gold" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Estoque Crítico</p>
                        <p className="text-2xl font-bold text-red-400">{produtosCriticos}</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-red-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Estoque Baixo</p>
                        <p className="text-2xl font-bold text-yellow-400">{produtosBaixos}</p>
                      </div>
                      <TrendingDown className="w-8 h-8 text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-barbershop-gray-400 text-sm">Valor Total</p>
                        <p className="text-2xl font-bold text-green-400">R$ {valorTotalEstoque.toFixed(2)}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Busca */}
              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-barbershop-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar produto por nome, categoria ou fornecedor..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10 bg-barbershop-gray-700 border-barbershop-gray-600 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tabela de Estoque */}
              <Card className="bg-barbershop-gray-800 border-barbershop-gray-700">
                <CardHeader>
                  <CardTitle className="text-barbershop-gold">Controle de Estoque</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-barbershop-gray-600">
                        <TableHead className="text-barbershop-gray-300">Produto</TableHead>
                        <TableHead className="text-barbershop-gray-300">Categoria</TableHead>
                        <TableHead className="text-barbershop-gray-300">Quantidade</TableHead>
                        <TableHead className="text-barbershop-gray-300">Mín. Estoque</TableHead>
                        <TableHead className="text-barbershop-gray-300">Preço Unit.</TableHead>
                        <TableHead className="text-barbershop-gray-300">Fornecedor</TableHead>
                        <TableHead className="text-barbershop-gray-300">Status</TableHead>
                        <TableHead className="text-barbershop-gray-300">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEstoque.map((item) => (
                        <TableRow key={item.id} className="border-barbershop-gray-600">
                          <TableCell className="text-barbershop-gray-200 font-medium">
                            {item.nome}
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">{item.categoria}</TableCell>
                          <TableCell className="text-barbershop-gray-200">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(item.status)}
                              <span>{item.quantidade}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-barbershop-gray-400">{item.minimo}</TableCell>
                          <TableCell className="text-barbershop-gold font-medium">
                            R$ {item.preco.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-barbershop-gray-200">{item.fornecedor}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(item.status)} text-white`}>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="border-barbershop-gray-600 text-barbershop-gray-300 hover:bg-barbershop-gray-700">
                                Editar
                              </Button>
                              <Button size="sm" className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold-dark">
                                Repor
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Estoque;
