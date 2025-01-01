// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { describe, expect, test } from "@jest/globals";
import { createTestPluginAndRun } from "./helpers.js";

describe("GeneratedFile.importSchema", () => {
  test("should create import symbol for enum descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      enum Foo {
        FOO_UNSPECIFIED = 0;
        FOO_BAR = 1;
      }
      `,
      parameter: "target=ts",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].enums[0]);
        expect(imp.name).toBe("FooSchema");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create prefixed import symbol for enum descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      enum Foo {
        FOO_UNSPECIFIED = 0;
        FOO_BAR = 1;
      }
      `,
      parameter: "target=ts,type_prefix=Bar",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].enums[0]);
        expect(imp.name).toBe("BarFooSchema");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create suffixed import symbol for enum descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      enum Foo {
        FOO_UNSPECIFIED = 0;
        FOO_BAR = 1;
      }
      `,
      parameter: "target=ts,type_suffix=Bar",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].enums[0]);
        expect(imp.name).toBe("FooBarSchema");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create prefixed and suffixed import symbol for enum descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      enum Foo {
        FOO_UNSPECIFIED = 0;
        FOO_BAR = 1;
      }
      `,
      parameter: "target=ts,type_prefix=Bar,type_suffix=Baz",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].enums[0]);
        expect(imp.name).toBe("BarFooBazSchema");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create import symbol for message descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      message Person {}
      `,
      parameter: "target=ts",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].messages[0]);
        expect(imp.name).toBe("PersonSchema");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create prefixed import symbol for message descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      message Person {}
      `,
      parameter: "target=ts,type_prefix=Foo",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].messages[0]);
        expect(imp.name).toBe("FooPersonSchema");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create suffixed import symbol for message descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      message Person {}
      `,
      parameter: "target=ts,type_suffix=Foo",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].messages[0]);
        expect(imp.name).toBe("PersonFooSchema");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create prefixed and suffixed import symbol for message descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      message Person {}
      `,
      parameter: "target=ts,type_prefix=Foo,type_suffix=Bar",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].messages[0]);
        expect(imp.name).toBe("FooPersonBarSchema");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create import symbol for service descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      message Msg {}
      service Serv {
        rpc Act(Msg) returns (Msg);
      }
      `,
      parameter: "target=ts",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].services[0]);
        expect(imp.name).toBe("Serv");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create prefixed import symbol for service descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      message Msg {}
      service Serv {
        rpc Act(Msg) returns (Msg);
      }
      `,
      parameter: "target=ts,type_prefix=Foo",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].services[0]);
        expect(imp.name).toBe("FooServ");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create suffixed import symbol for service descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      message Msg {}
      service Serv {
        rpc Act(Msg) returns (Msg);
      }
      `,
      parameter: "target=ts,type_suffix=Foo",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].services[0]);
        expect(imp.name).toBe("ServFoo");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create prefixed and suffixed import symbol for service descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      message Msg {}
      service Serv {
        rpc Act(Msg) returns (Msg);
      }
      `,
      parameter: "target=ts,type_prefix=Foo,type_suffix=Bar",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].services[0]);
        expect(imp.name).toBe("FooServBar");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create import symbol for extension descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto2";
      message Msg {
        extensions 10 to 10;
      }
      extend Msg {
        optional int32 ext = 10;
      }
      `,
      parameter: "target=ts",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].extensions[0]);
        expect(imp.name).toBe("ext");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create prefixed import symbol for extension descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto2";
      message Msg {
        extensions 10 to 10;
      }
      extend Msg {
        optional int32 ext = 10;
      }
      `,
      parameter: "target=ts,type_prefix=Foo_",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].extensions[0]);
        expect(imp.name).toBe("Foo_ext");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create suffixed import symbol for extension descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto2";
      message Msg {
        extensions 10 to 10;
      }
      extend Msg {
        optional int32 ext = 10;
      }
      `,
      parameter: "target=ts,type_suffix=_Foo",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].extensions[0]);
        expect(imp.name).toBe("ext_Foo");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create prefixed and suffixed import symbol for extension descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto2";
      message Msg {
        extensions 10 to 10;
      }
      extend Msg {
        optional int32 ext = 10;
      }
      `,
      parameter: "target=ts,type_prefix=Foo_,type_suffix=_Bar",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].extensions[0]);
        expect(imp.name).toBe("Foo_ext_Bar");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create import symbol for file descriptor", async function () {
    await createTestPluginAndRun({
      proto: {
        "my-proto-files/23/dir:/joe's files/x.proto": `syntax="proto3";`,
      },
      parameter: "target=ts",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0]);
        expect(imp.name).toBe("file_my_proto_files_23_dir_joe_s_files_x");
        expect(imp.from).toBe("./my-proto-files/23/dir:/joe's files/x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should ignore type prefix when creating import symbol for file descriptor", async function () {
    await createTestPluginAndRun({
      proto: {
        "my-proto-files/23/dir:/joe's files/x.proto": `syntax="proto3";`,
      },
      parameter: "target=ts,type_prefix=foo_",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0]);
        expect(imp.name).toBe("file_my_proto_files_23_dir_joe_s_files_x");
        expect(imp.from).toBe("./my-proto-files/23/dir:/joe's files/x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should ignore type suffix when creating import symbol for file descriptor", async function () {
    await createTestPluginAndRun({
      proto: {
        "my-proto-files/23/dir:/joe's files/x.proto": `syntax="proto3";`,
      },
      parameter: "target=ts,type_suffix=_foo",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0]);
        expect(imp.name).toBe("file_my_proto_files_23_dir_joe_s_files_x");
        expect(imp.from).toBe("./my-proto-files/23/dir:/joe's files/x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
});
